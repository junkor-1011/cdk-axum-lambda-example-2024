FROM docker.io/library/hello-world:latest

# /asset -> /opt in lambda layers
COPY --from=public.ecr.aws/awsguru/aws-lambda-adapter:0.8.4 /lambda-adapter /asset/extensions/lambda-adapter
