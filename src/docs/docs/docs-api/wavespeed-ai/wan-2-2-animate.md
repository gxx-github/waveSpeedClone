# /docs/docs-api/wavespeed-ai/wan-2.2-animate

来源: https://wavespeed.ai/docs/docs-api/wavespeed-ai/wan-2.2-animate

[WaveSpeedAI API](/docs/docs-api/webhooks "WaveSpeedAI API")[Wavespeed AI](/docs/docs-api/wavespeed-ai/any-llm "Wavespeed AI")Wan 2.2 Animate

# Wan 2.2 Animate

Wan 2.2 Animate

## Playground[](#playground)

[Try it on WavespeedAI!](https://wavespeed.ai/models/wavespeed-ai/wan-2.2/animate)

Wan2.2-Animate is a unified model for character animation and replacement with holistic movement and expression replication. The model is released under the Apache 2.0 license and supports commercial use. Our endpoint starts with $0.2 per 5 seconds (480p) or $0.4 per 5 seconds (720p) video generation and supports a maximum generation length of 120 seconds.

## Features[](#features)

# Wan2.2-Animate

## What is Wan2.2-Animate?[](#what-is-wan22-animate)

**Wan2.2-Animate** is an optimized, unified character animation/replacement model that maps static inputs to targeted actions, replicating holistic body movement and facial expressions with high temporal stability and natural realism.

## Pricing[](#pricing)

Output

Price per 5s

Max Length

480p

**$0.2**

**120 s**

720p

**$0.4**

**120 s**

## How to Use (Wan2.2-Animate)[](#how-to-use-wan22-animate)

1.  **image** – Upload a clear character photo. (Recommend using **PNG** and **JPG** formats, and avoid **WEBP**)
2.  **video** – Upload the motion clip (pose/expressions come from here).
3.  **prompt** (optional) – Brief rules, e.g., “preserve outfit; natural expression; no background changes.”
4.  **mode** – Choose **replace** or **animate**.
5.  **resolution** – Pick **480p** or **720p**.
6.  **Generate** – Wait a moment for results.
7.  **Review & iterate** – Fix a `seed` to reproduce; change `seed` for A/B variants.

## Tips[](#tips)

*   **Match composition & pose:** Keep the reference image and target video aligned in **composition**, **camera position**, and **human body pose** to reduce failure rates.
*   **Keep aspect ratios the same:** Use the **same aspect ratio** for the input image and video for best results.

## Authentication[](#authentication)

For authentication details, please refer to the [Authentication Guide](/docs/docs-authentication).

## API Endpoints[](#api-endpoints)

### Submit Task & Query Result[](#submit-task--query-result)

cURLPythonJavaScript

```bash

# Submit the task
curl --location --request POST "https://api.wavespeed.ai/api/v3/wavespeed-ai/wan-2.2/animate" \
--header "Content-Type: application/json" \
--header "Authorization: Bearer ${WAVESPEED_API_KEY}" \
--data-raw '{
    "mode": "animate",
    "resolution": "480p",
    "seed": -1
}'

# Get the result
curl --location --request GET "https://api.wavespeed.ai/api/v3/predictions/${requestId}/result" \
--header "Authorization: Bearer ${WAVESPEED_API_KEY}"
```

## Parameters[](#parameters)

### Task Submission Parameters[](#task-submission-parameters)

#### Request Parameters[](#request-parameters)

Parameter

Type

Required

Default

Range

Description

image

string

Yes

\-

The image for generating the output.

video

string

Yes

\-

The video for generating the output.

prompt

string

No

\-

The positive prompt for the generation.

mode

string

No

animate

animate, replace

The mode of the generation. Animate Mode: animate the character in input image with movements from the input video. Replace Mode: replace the character in input video with the character in input image.

resolution

string

No

480p

480p, 720p

The resolution of the output video.

seed

integer

No

\-1

\-1 ~ 2147483647

The random seed to use for the generation. -1 means a random seed will be used.

#### Response Parameters[](#response-parameters)

Parameter

Type

Description

code

integer

HTTP status code (e.g., 200 for success)

message

string

Status message (e.g., “success”)

data.id

string

Unique identifier for the prediction, Task Id

data.model

string

Model ID used for the prediction

data.outputs

array

Array of URLs to the generated content (empty when status is not `completed`)

data.urls

object

Object containing related API endpoints

data.urls.get

string

URL to retrieve the prediction result

data.has\_nsfw\_contents

array

Array of boolean values indicating NSFW detection for each output

data.status

string

Status of the task: `created`, `processing`, `completed`, or `failed`

data.created\_at

string

ISO timestamp of when the request was created (e.g., “2023-04-01T12:34:56.789Z”)

data.error

string

Error message (empty if no error occurred)

data.timings

object

Object containing timing details

data.timings.inference

integer

Inference time in milliseconds

#### Result Request Parameters[](#result-request-parameters)

[Wan 2.1 V2V 720p Ultra Fast](/docs/docs-api/wavespeed-ai/wan-2.1-v2v-720p-ultra-fast "Wan 2.1 V2V 720p Ultra Fast")[Wan 2.2 Fun Control](/docs/docs-api/wavespeed-ai/wan-2.2-fun-control "Wan 2.2 Fun Control")