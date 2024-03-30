import { NestedStack, type NestedStackProps } from 'aws-cdk-lib';
import { Architecture } from 'aws-cdk-lib/aws-lambda';
import type { Construct } from 'constructs';

import { ApiSystemUsingLambdaWebAdapter } from './constructs/api-system-using-lambda-webadapter-layer';

export class LambdaWebAdapterAMD64ExampleStack extends NestedStack {
  constructor(scope: Construct, id: string, props?: NestedStackProps) {
    super(scope, id, props);

    new ApiSystemUsingLambdaWebAdapter(
      this,
      'api-system-using-webadapter-layer-amd64',
      {
        name: 'api-system-using-webadapter-layer-amd64',
        architecture: Architecture.X86_64,
      },
    );
  }
}
