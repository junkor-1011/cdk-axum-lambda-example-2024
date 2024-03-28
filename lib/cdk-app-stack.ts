import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { Stack, type StackProps } from 'aws-cdk-lib';
import type { Construct } from 'constructs';

import { ApiSystemWithLayer } from './constructs/api-sytem-with-layer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class CdkAppStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    new ApiSystemWithLayer(this, 'api-system-with-layer', {
      name: 'api-system-with-layer',
    });
  }
}
