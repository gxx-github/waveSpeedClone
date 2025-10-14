# /docs/docs-api/alibaba/alibaba-wan-2.1-t2v-plus-720p

来源: https://wavespeed.ai/docs/docs-api/alibaba/alibaba-wan-2.1-t2v-plus-720p

[WaveSpeedAI API](/docs/docs-api/webhooks "WaveSpeedAI API")[Alibaba](/docs/docs-api/alibaba/alibaba-qwen-image-translate "Alibaba")Alibaba Wan 2.1 T2V Plus 720p

# Alibaba Wan 2.1 T2V Plus 720p

Alibaba Wan 2.1 T2V Plus 720p

## Playground[](#playground)

[Try it on WavespeedAI!](https://wavespeed.ai/models/alibaba/wan-2.1/t2v-plus-720p)

Generate unlimited AI videos with Alibaba WAN 2.1 text-to-video model.

## Features[](#features)

# Alibaba WAN 2.1 — Text-to-Video Plus Model (720p)

**Alibaba WAN 2.1 T2V Plus** is an advanced **text-to-video generation model** powered by Alibaba Cloud’s **Mixture of Experts (MoE)** architecture. It creates cinematic **5-second 720p videos** with natural motion, balanced lighting, and smooth transitions — optimized for **speed, stability, and storytelling flexibility**.

* * *

## Why it looks great[](#why-it-looks-great)

*   **Cinematic control:** captures lighting, color tone, and depth for professional-grade visuals.
*   **Smooth temporal motion:** ensures coherent motion flow between subjects and background.
*   **Prompt accuracy:** delivers faithful interpretation of detailed text descriptions.
*   **Optimized 720p efficiency:** achieves excellent quality at faster inference and lower cost.
*   **Stable rendering:** minimizes flicker, distortion, or structure shifts during animation.

* * *

## Pricing[](#pricing)

Duration

Resolution

Cost per job

5 s

720p

**$0.70**

* * *

## How to Use[](#how-to-use)

1.  **Write Prompt** – describe the desired scene, environment, and camera movement.
2.  **Choose Size** – select landscape (1280×720) or portrait (720×1280).
3.  _(Optional)_ Add a **Negative Prompt** to exclude unwanted elements.
4.  _(Optional)_ Set **Seed** for reproducibility.
5.  **Run** – preview and download your generated 5-second clip.

* * *

## Pro Tips[](#pro-tips)

*   Include **motion cues** (e.g., “camera panning,” “soft breeze,” “car moving through city lights”).
*   Use **portrait mode** for short-form social content, **landscape** for cinematic or presentation use.
*   Keep prompts **focused and clear** for best visual alignment and stable motion.

* * *

## Notes[](#notes)

*   Please verify that your **prompt and parameters** are set correctly before running.
*   If results appear inconsistent, try a new **seed value** or simplify your prompt.

## Authentication[](#authentication)

For authentication details, please refer to the [Authentication Guide](/docs/docs-authentication).

## API Endpoints[](#api-endpoints)

### Submit Task & Query Result[](#submit-task--query-result)

cURLPythonJavaScript

```bash

# Submit the task
curl --location --request POST "https://api.wavespeed.ai/api/v3/alibaba/wan-2.1/t2v-plus-720p" \
--header "Content-Type: application/json" \
--header "Authorization: Bearer ${WAVESPEED_API_KEY}" \
--data-raw '{
    "size": "1280*720",
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

prompt

string

Yes

\-

The positive prompt for the generation.

size

string

No

1280\*720

1280\*720, 720\*1280

The size of the generated media in pixels (width\*height).

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

[Alibaba Wan 2.1 I2V Plus 720p](/docs/docs-api/alibaba/alibaba-wan-2.1-i2v-plus-720p "Alibaba Wan 2.1 I2V Plus 720p")[Alibaba Wan 2.2 I2V Plus 1080p](/docs/docs-api/alibaba/alibaba-wan-2.2-i2v-plus-1080p "Alibaba Wan 2.2 I2V Plus 1080p")