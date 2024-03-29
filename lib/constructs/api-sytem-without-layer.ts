import path from 'node:path';
import { fileURLToPath } from 'node:url';

import * as cdk from 'aws-cdk-lib';
import {
  aws_apigateway as apigateway,
  aws_lambda as lambda,
} from 'aws-cdk-lib';
import { RustFunction } from 'cargo-lambda-cdk';
import { Construct } from 'constructs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export interface ApiSystemWithLayerProps {
  readonly name: string;
}

export class ApiSystemWithoutLayer extends Construct {
  public readonly name: string;

  constructor(scope: Construct, id: string, props: ApiSystemWithLayerProps) {
    super(scope, id);

    this.name = props.name;

    const apiBackendFunction = new RustFunction(this, 'axum-lambda-http', {
      functionName: 'axum-lambda-http',
      manifestPath: path.join(
        __dirname,
        '../../rust-workspace/axum-lambda-http/Cargo.toml',
      ),
      timeout: cdk.Duration.seconds(10),
      memorySize: 128,
      architecture: lambda.Architecture.X86_64,
      tracing: lambda.Tracing.ACTIVE,
      environment: {
        RUST_LOG: 'debug',
        AWS_LAMBDA_HTTP_IGNORE_STAGE_IN_PATH: 'true',
      },
    });

    new apigateway.LambdaRestApi(this, 'API using axum and lambda-http', {
      handler: apiBackendFunction,
      proxy: true, // handling all routing & all methods
    });
  }
}
