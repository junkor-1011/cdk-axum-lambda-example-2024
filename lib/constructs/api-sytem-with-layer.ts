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

export class ApiSystemWithLayer extends Construct {
  public readonly name: string;

  constructor(scope: Construct, id: string, props: ApiSystemWithLayerProps) {
    super(scope, id);

    this.name = props.name;

    const lambdaWebAdapterLayer = new lambda.LayerVersion(
      this,
      'LambdaWebAdapter',
      {
        code: lambda.Code.fromDockerBuild(
          path.join(__dirname, '../../layers/lambda-web-adapter'),
        ),
        // compatibleRuntimes: [lambda.Runtime.PROVIDED_AL2023],
        compatibleArchitectures: [lambda.Architecture.X86_64],
      },
    );

    const apiBackendFunction = new RustFunction(this, 'greet', {
      manifestPath: path.join(
        __dirname,
        '../../rust-workspace/axum-api/Cargo.toml',
      ),
      timeout: cdk.Duration.seconds(10),
      memorySize: 128,
      architecture: lambda.Architecture.X86_64,
      layers: [lambdaWebAdapterLayer],
      tracing: lambda.Tracing.ACTIVE,
      environment: {
        RUST_LOG: 'debug',
        PORT: '3000',
      },
    });

    new apigateway.LambdaRestApi(this, 'API using axum', {
      handler: apiBackendFunction,
      proxy: true, // handling all routing & all methods
    });
  }
}
