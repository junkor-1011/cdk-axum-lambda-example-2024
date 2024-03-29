import { Stack, type StackProps } from 'aws-cdk-lib';
import type { Construct } from 'constructs';

import { ApiSystemWithLayer } from './constructs/api-sytem-with-layer';
import { ApiSystemWithoutLayer } from './constructs/api-sytem-without-layer';

export class CdkAppStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    new ApiSystemWithLayer(this, 'api-system-with-layer', {
      name: 'api-system-with-layer',
    });

    new ApiSystemWithoutLayer(this, 'api-system-without-layer', {
      name: 'api-system-without-layer',
    });
  }
}
