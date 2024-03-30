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

export interface ApiSystemUsingLambdaWebAdapterProps {
  readonly name: string;
  readonly architecture: lambda.Architecture;
}

export class ApiSystemUsingLambdaWebAdapter extends Construct {
  public readonly name: string;

  constructor(
    scope: Construct,
    id: string,
    props: ApiSystemUsingLambdaWebAdapterProps,
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

    const lambdaWebAdapterLayer = new lambda.LayerVersion(
      this,
      `LambdaWebAdapter-${archType}`,
      {
        code: lambda.Code.fromDockerBuild(
          path.join(__dirname, '../../layers/lambda-web-adapter'),
          {
            file:
              props.architecture === lambda.Architecture.X86_64
                ? 'x86_64.Dockerfile'
                : props.architecture === lambda.Architecture.ARM_64
                  ? 'aarch64.Dockerfile'
                  : undefined,
          },
        ),
        // compatibleRuntimes: [lambda.Runtime.PROVIDED_AL2023],
        compatibleArchitectures: [props.architecture],
      },
    );

    const apiBackendFunction = new RustFunction(this, 'axum-lambda-server', {
      functionName: `axum-server-function-${archType}`,
      manifestPath: path.join(
        __dirname,
        '../../rust-workspace/axum-server/Cargo.toml',
      ),
      timeout: cdk.Duration.seconds(10),
      memorySize: 128,
      architecture: props.architecture,
      layers: [lambdaWebAdapterLayer],
      tracing: lambda.Tracing.ACTIVE,
      environment: {
        RUST_LOG: 'debug',
        PORT: '3000',
      },
    });

    new apigateway.LambdaRestApi(this, `API using axum ${archType}`, {
      restApiName: `api-axum-using-lambda-web-adapter-layer-${archType}`,
      handler: apiBackendFunction,
      proxy: true, // handling all routing & all methods
    });
  }
}
