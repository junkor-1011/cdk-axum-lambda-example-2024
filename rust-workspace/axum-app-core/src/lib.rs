mod handlers;

use axum::{
    routing::{get, post},
    Router,
};
use handlers::{
    greet::{greet_get, greet_post},
    reqwest_example::{get_ipv4, get_ipv4_simple},
    root,
};

pub fn create_app() -> Router {
    let reqwest_client = reqwest::Client::new();

    Router::new()
        .route("/", get(root))
        .route("/greet", get(greet_get))
        .route("/greet", post(greet_post))
        .route("/check-ipv4-simple", get(get_ipv4_simple))
        .route("/check-ipv4", get(get_ipv4))
        .with_state(reqwest_client)
}
