import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { expect, test } from 'vitest';
import { CdkAppStack } from '../lib/cdk-app-stack';
import { ignoreAssetHashSerializer } from './plugins/ignore-asset-hash';

test('snapshot test(root stack)', () => {
  const app = new cdk.App();
  const stack = new CdkAppStack(app, 'TestRootStack');
  const template = Template.fromStack(stack).toJSON();

  expect.addSnapshotSerializer(ignoreAssetHashSerializer);
  expect(template).toMatchSnapshot();

  for (const child of stack.node.children.filter(
    (child) => child instanceof cdk.NestedStack,
  )) {
    expect(Template.fromStack(child as cdk.NestedStack)).toMatchSnapshot();
  }
});
