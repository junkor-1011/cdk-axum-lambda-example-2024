use std::collections::HashMap;

use axum::{extract::Query, http::header::HeaderMap};

pub mod greet;
pub mod reqwest_example;

#[tracing::instrument]
pub async fn root(
    headers: HeaderMap,
    Query(params): Query<HashMap<String, String>>,
) -> &'static str {
    tracing::debug!("invoke root");

    for (key, value) in headers {
        if let Some(key) = key {
            tracing::debug!("header {key}: {value:#?}");
        } else {
            tracing::debug!("header {value:#?}");
        }
    }

    for (key, value) in params {
        tracing::debug!("query param {key}: {value}");
    }

    "Hello, world!"
}
