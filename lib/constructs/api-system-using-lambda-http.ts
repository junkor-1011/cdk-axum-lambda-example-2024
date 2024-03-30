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

export interface ApiSystemUsingLambdaHttpProps {
  readonly name: string;
  readonly architecture: lambda.Architecture;
}

export class ApiSystemUsingLambdaHttp extends Construct {
  public readonly name: string;

  constructor(
    scope: Construct,
    id: string,
    props: ApiSystemUsingLambdaHttpProps,
  ) {
    super(scope, id);

    this.name = props.name; // example

    const archType =
      props.architecture === lambda.Architecture.X86_64
        ? 'x86_64'
        : props.architecture === lambda.Architecture.ARM_64
          ? 'aarch64'
          : 'custom';

    if (archType === 'custom') {
      throw new Error('Not implemented yet.');
    }

    const apiBackendFunction = new RustFunction(this, 'axum-lambda-http', {
      functionName: `axum-lambda-http-${archType}`,
      manifestPath: path.join(
        __dirname,
        '../../rust-workspace/axum-lambda-http/Cargo.toml',
      ),
      timeout: cdk.Duration.seconds(10),
      memorySize: 128,
      architecture: props.architecture,
      tracing: lambda.Tracing.ACTIVE,
      environment: {
        RUST_LOG: 'debug',
        AWS_LAMBDA_HTTP_IGNORE_STAGE_IN_PATH: 'true',
      },
    });

    new apigateway.LambdaRestApi(
      this,
      `API using axum and lambda-http ${archType}`,
      {
        restApiName: `api-axum-using-lambda-http-${archType}`,
        handler: apiBackendFunction,
        proxy: true, // handling all routing & all methods
      },
    );
  }
}
