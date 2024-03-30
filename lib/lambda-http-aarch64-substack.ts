import { NestedStack, type NestedStackProps } from 'aws-cdk-lib';
import { Architecture } from 'aws-cdk-lib/aws-lambda';
import type { Construct } from 'constructs';

import { ApiSystemUsingLambdaHttp } from './constructs/api-system-using-lambda-http';

export class LambdaHttpARM64ExampleStack extends NestedStack {
  constructor(scope: Construct, id: string, props?: NestedStackProps) {
    super(scope, id, props);

    new ApiSystemUsingLambdaHttp(this, 'api-system-using-lambda-http-aarch64', {
      name: 'api-system-using-lambda-http-aarch64',
      architecture: Architecture.ARM_64,
    });
  }
}
