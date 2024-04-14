use axum::{response::IntoResponse, Json};
use chrono::Utc;
use hyper::StatusCode;
use serde::{Deserialize, Serialize};

pub async fn greet_get() -> impl IntoResponse {
    tracing::debug!("greet get");

    let body = GreetGetResponse {
        message: "Hello, World!!!".to_string(),
        date: Utc::now().to_string(),
    };

    (StatusCode::OK, Json(body))
}

pub async fn greet_post(Json(payload): Json<GreetPostRequest>) -> impl IntoResponse {
    tracing::debug!("greet post");

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
