mod handlers;

use axum::{
    routing::{get, post},
    Router,
};
use handlers::greet::{greet_get, greet_post};

pub fn create_app() -> Router {
    Router::new()
        .route("/", get(root))
        .route("/greet", get(greet_get))
        .route("/greet", post(greet_post))
}

pub async fn root() -> &'static str {
    "Hello, world!"
}
