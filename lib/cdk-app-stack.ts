import { Stack, type StackProps } from 'aws-cdk-lib';
import type { Construct } from 'constructs';

import { LambdaHttpARM64ExampleStack } from './lambda-http-aarch64-substack';
import { LambdaHttpAMD64ExampleStack } from './lambda-http-amd64-substack';
import { LambdaWebAdapterARM64ExampleStack } from './lambda-web-adapter-aarch64-substack';
import { LambdaWebAdapterAMD64ExampleStack } from './lambda-web-adapter-amd64-substack';

export class CdkAppStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    new LambdaWebAdapterAMD64ExampleStack(
      this,
      'LambdaWebAdapterAMD64Example-NestedStack',
    );
    new LambdaHttpAMD64ExampleStack(this, 'LambdaHttpAMD64Example-NestedStack');

    new LambdaWebAdapterARM64ExampleStack(
      this,
      'LambdaWebAdapterARM64Example-NestedStack',
    );
    new LambdaHttpARM64ExampleStack(this, 'LambdaHttpARM64Example-NestedStack');
  }
}
