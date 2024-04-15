pub mod greet;
pub mod reqwest_example;

#[tracing::instrument]
pub async fn root() -> &'static str {
    tracing::debug!("invoke root");

    "Hello, world!"
}
