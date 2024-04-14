mod handlers;

use axum::{
    routing::{get, post},
    Router,
};
use handlers::{
    greet::{greet_get, greet_post},
    reqwest_example::get_ipv4_simple,
};

pub fn create_app() -> Router {
    Router::new()
        .route("/", get(root))
        .route("/greet", get(greet_get))
        .route("/greet", post(greet_post))
        .route("/check-ipv4", get(get_ipv4_simple))
}

pub async fn root() -> &'static str {
    "Hello, world!"
}
