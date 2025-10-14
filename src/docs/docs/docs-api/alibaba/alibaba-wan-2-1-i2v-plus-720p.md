# /docs/docs-api/alibaba/alibaba-wan-2.1-i2v-plus-720p

来源: https://wavespeed.ai/docs/docs-api/alibaba/alibaba-wan-2.1-i2v-plus-720p

[WaveSpeedAI API](/docs/docs-api/webhooks "WaveSpeedAI API")[Alibaba](/docs/docs-api/alibaba/alibaba-qwen-image-translate "Alibaba")Alibaba Wan 2.1 I2V Plus 720p

# Alibaba Wan 2.1 I2V Plus 720p

Alibaba Wan 2.1 I2V Plus 720p

## Playground[](#playground)

[Try it on WavespeedAI!](https://wavespeed.ai/models/alibaba/wan-2.1/i2v-plus-720p)

Generate unlimited AI videos with Alibaba WAN 2.1 image-to-video model from image inputs.

## Features[](#features)

# Alibaba WAN 2.1 — Image-to-Video Model-Plus (720p)

**Alibaba WAN 2.1** is an advanced **image-to-video generation model** that transforms static images into smooth, cinematic **5-second motion clips**. This 720p version provides the ideal balance between visual quality and generation speed — perfect for professional content creation and rapid storytelling.

* * *

## 🌟 Key Features[](#-key-features)

*   **Cinematic Motion Generation** Adds natural depth, parallax, and camera motion effects to bring still images to life.
    
*   **High Temporal Consistency** Maintains stable structure and lighting across all frames for smooth playback.
    
*   **Balanced 720p Output** Delivers clear HD video optimized for both web and mobile distribution.
    
*   **Lightweight and Efficient** Produces professional-quality motion in seconds, minimizing compute cost and latency.
    
*   **Creative Flexibility** Works across diverse visual styles — from portraits and landscapes to products and illustrations.
    

* * *

## ⚙️ Capabilities[](#️-capabilities)

*   **Input:** Single image (JPEG / PNG)
*   **Output:** 5-second 720p MP4 video
*   **Supports:** Camera motion, lighting drift, and subject parallax effects

* * *

## 💰 Pricing[](#-pricing)

Duration

Resolution

Cost (USD)

5 seconds

720p

**$0.70**

* * *

## 💡 Best Use Cases[](#-best-use-cases)

*   **Social Media & Marketing** — Animate photos into attention-grabbing motion content.
*   **E-commerce & Branding** — Add cinematic motion to product visuals and hero shots.
*   **Art & Photography** — Turn static compositions into immersive short clips.
*   **Education & Storytelling** — Visualize concepts and narratives dynamically.

* * *

## 📝 Notes[](#-notes)

*   For **best results**, upload clear, high-resolution images with good lighting and contrast.
*   Simple prompts and compositions yield the most stable motion.

## Authentication[](#authentication)

For authentication details, please refer to the [Authentication Guide](/docs/docs-authentication).

## API Endpoints[](#api-endpoints)

### Submit Task & Query Result[](#submit-task--query-result)

cURLPythonJavaScript

```bash

# Submit the task
curl --location --request POST "https://api.wavespeed.ai/api/v3/alibaba/wan-2.1/i2v-plus-720p" \
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

[Alibaba Qwen3 Tts Flash](/docs/docs-api/alibaba/alibaba-qwen3-tts-flash "Alibaba Qwen3 Tts Flash")[Alibaba Wan 2.1 T2V Plus 720p](/docs/docs-api/alibaba/alibaba-wan-2.1-t2v-plus-720p "Alibaba Wan 2.1 T2V Plus 720p")