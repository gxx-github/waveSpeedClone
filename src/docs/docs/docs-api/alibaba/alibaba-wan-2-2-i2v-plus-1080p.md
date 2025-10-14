# /docs/docs-api/alibaba/alibaba-wan-2.2-i2v-plus-1080p

来源: https://wavespeed.ai/docs/docs-api/alibaba/alibaba-wan-2.2-i2v-plus-1080p

[WaveSpeedAI API](/docs/docs-api/webhooks "WaveSpeedAI API")[Alibaba](/docs/docs-api/alibaba/alibaba-qwen-image-translate "Alibaba")Alibaba Wan 2.2 I2V Plus 1080p

# Alibaba Wan 2.2 I2V Plus 1080p

Alibaba Wan 2.2 I2V Plus 1080p

## Playground[](#playground)

[Try it on WavespeedAI!](https://wavespeed.ai/models/alibaba/wan-2.2/i2v-plus-1080p)

Generate unlimited AI videos with Alibaba WAN 2.2 image-to-video model.

## Features[](#features)

# Alibaba WAN 2.2 Image-to-Video Model (1080p)

Alibaba WAN 2.2 is an advanced **image-to-video model** provided by Alibaba Cloud’s DashScope platform. This model adopts an innovative MoE (Mixture of Experts) architecture for generating high-quality video content from images at full HD 1080p resolution.

## Why it looks great[](#why-it-looks-great)

*   **Cinematic control:** handles lighting, color, and composition with a film-style aesthetic.
*   **Stable, natural motion:** restores nuanced subject movement and camera dynamics.
*   **Semantic fidelity:** follows complex editing prompts while preserving scene coherence.
*   **Clean edits:** supports negative prompts and prompt optimization to reduce artifacts.

## Limits and Performance[](#limits-and-performance)

*   **Input:** one image + text prompt
*   **Output resolution:** **1080p (Full HD)**
*   **Clip length per job:** **5 seconds**

## Pricing[](#pricing)

Per-job billing with a 5-second clip length.

Duration

Resolution

Cost per job

5 s

1080p

**$0.80**

## How to Use[](#how-to-use)

1.  **Upload Image** – drag & drop or paste a URL.
2.  **Write Prompt** – describe motion, mood, camera, lighting, etc.
3.  _(Optional)_ **Negative Prompt** – exclude unwanted objects/styles.
4.  _(Optional)_ **Seed** – fix for reproducibility (`-1` = random).
5.  **Run** – generate, preview, and download.

* * *

## Notes[](#notes)

*   Please check that your uploaded **image URL** is valid and accessible.
*   If the URL is not working, consider uploading the image locally.
*   Recommended image formats: **JPG / PNG**.

## Authentication[](#authentication)

For authentication details, please refer to the [Authentication Guide](/docs/docs-authentication).

## API Endpoints[](#api-endpoints)

### Submit Task & Query Result[](#submit-task--query-result)

cURLPythonJavaScript

```bash

# Submit the task
curl --location --request POST "https://api.wavespeed.ai/api/v3/alibaba/wan-2.2/i2v-plus-1080p" \
--header "Content-Type: application/json" \
--header "Authorization: Bearer ${WAVESPEED_API_KEY}" \
--data-raw '{
    "duration": 5,
    "enable_prompt_expansion": false,
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

prompt

string

Yes

\-

The positive prompt for the generation.

duration

integer

No

5

5

The duration of the generated media in seconds.

enable\_prompt\_expansion

boolean

No

false

\-

If set to true, the prompt optimizer will be enabled.

negative\_prompt

string

No

\-

The negative prompt for the generation.

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

[Alibaba Wan 2.1 T2V Plus 720p](/docs/docs-api/alibaba/alibaba-wan-2.1-t2v-plus-720p "Alibaba Wan 2.1 T2V Plus 720p")[Alibaba Wan 2.2 I2V Plus 480p](/docs/docs-api/alibaba/alibaba-wan-2.2-i2v-plus-480p "Alibaba Wan 2.2 I2V Plus 480p")