import { Stack, type StackProps, Tags } from 'aws-cdk-lib';
import type { Construct } from 'constructs';

import { LambdaHttpARM64ExampleStack } from './lambda-http-aarch64-substack';
import { LambdaHttpAMD64ExampleStack } from './lambda-http-amd64-substack';
import { LambdaWebAdapterARM64ExampleStack } from './lambda-web-adapter-aarch64-substack';
import { LambdaWebAdapterAMD64ExampleStack } from './lambda-web-adapter-amd64-substack';

export class CdkAppStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const stackLambdaWebAdapterAMD64Example =
      new LambdaWebAdapterAMD64ExampleStack(
        this,
        'LambdaWebAdapterAMD64Example-NestedStack',
      );
    Tags.of(stackLambdaWebAdapterAMD64Example).add(
      'Cost',
      'LambdaWebAdapterAMD64Example',
    );

    const stackLambdaHttpAMD64Example = new LambdaHttpAMD64ExampleStack(
      this,
      'LambdaHttpAMD64Example-NestedStack',
    );
    Tags.of(stackLambdaHttpAMD64Example).add('Cost', 'LambdaHttpAMD64Example');

    const stackLambdaWebAdapterARM64Example =
      new LambdaWebAdapterARM64ExampleStack(
        this,
        'LambdaWebAdapterARM64Example-NestedStack',
      );
    Tags.of(stackLambdaWebAdapterARM64Example).add(
      'Cost',
      'LambdaWebAdapterARM64Example',
    );

    const stackLambdaHttpARM64Example = new LambdaHttpARM64ExampleStack(
      this,
      'LambdaHttpARM64Example-NestedStack',
    );
    Tags.of(stackLambdaHttpARM64Example).add('Cost', 'LambdaHttpARM64Example');
  }
}
