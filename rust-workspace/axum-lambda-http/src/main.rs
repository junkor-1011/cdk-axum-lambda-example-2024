use std::env::set_var;

use axum_app_core::create_app;
use lambda_http::run;

#[tokio::main]
async fn main() -> Result<(), lambda_http::Error> {
    set_var("AWS_LAMBDA_HTTP_IGNORE_STAGE_IN_PATH", "true");

    tracing_subscriber::fmt()
        .json()
        .with_current_span(false)
        .with_ansi(false)
        .with_env_filter(tracing_subscriber::EnvFilter::from_default_env())
        .init();

    let app = create_app();

    run(app).await
}
