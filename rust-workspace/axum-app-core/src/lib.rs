use axum::{
    response::IntoResponse,
    routing::{get, post},
    Json, Router,
};
use chrono::Utc;
use hyper::StatusCode;
use serde::{Deserialize, Serialize};

pub fn create_app() -> Router {
    Router::new()
        .route("/", get(root))
        .route("/greet", get(greet))
        .route("/greet", post(greet_post))
}

pub async fn root() -> &'static str {
    "Hello, world!"
}

pub async fn greet() -> impl IntoResponse {
    tracing::debug!("greet");

    let body = GreetGetResponse {
        message: "Hello, World!!!".to_string(),
        date: Utc::now().to_string(),
    };

    (StatusCode::OK, Json(body))
}

pub async fn greet_post(Json(payload): Json<GreetPostRequest>) -> impl IntoResponse {
    let GreetPostRequest { name } = payload;
    let body = GreetPostResponse {
        message: format!("Hello, {name}"),
        date: Utc::now().to_string(),
    };

    (StatusCode::OK, Json(body))
}

#[derive(Serialize, Debug)]
pub struct GreetGetResponse {
    message: String,
    date: String,
}

#[derive(Deserialize)]
pub struct GreetPostRequest {
    name: String,
}

#[derive(Serialize, Debug)]
pub struct GreetPostResponse {
    message: String,
    date: String,
}
