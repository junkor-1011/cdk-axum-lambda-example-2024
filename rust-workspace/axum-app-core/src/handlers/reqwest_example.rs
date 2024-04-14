use axum::{response::IntoResponse, Json};
use hyper::StatusCode;
use serde::{Deserialize, Serialize};

pub async fn get_ipv4_simple() -> Result<Json<GetIpv4Response>, AppError> {
    tracing::debug!("get ipv4");

    let ip = reqwest::get("https://checkip.amazonaws.com")
        .await?
        .text()
        .await?
        .trim()
        .to_string();

    let response = GetIpv4Response { ip };

    Ok(Json(response))
}

#[derive(Debug, Serialize, Deserialize)]
pub struct GetIpv4Response {
    ip: String,
}

pub struct AppError(anyhow::Error);

impl IntoResponse for AppError {
    fn into_response(self) -> axum::response::Response {
        tracing::error!("internal error: {:#?}", self.0);
        (
            StatusCode::INTERNAL_SERVER_ERROR,
            format!("something went wrong: {}", self.0),
        )
            .into_response()
    }
}

impl<E> From<E> for AppError
where
    E: Into<anyhow::Error>,
{
    fn from(err: E) -> Self {
        Self(err.into())
    }
}
