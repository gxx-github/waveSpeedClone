# /docs/docs-api/alibaba/alibaba-wan-2.2-t2v-plus-1080p

来源: https://wavespeed.ai/docs/docs-api/alibaba/alibaba-wan-2.2-t2v-plus-1080p

[WaveSpeedAI API](/docs/docs-api/webhooks "WaveSpeedAI API")[Alibaba](/docs/docs-api/alibaba/alibaba-qwen-image-translate "Alibaba")Alibaba Wan 2.2 T2V Plus 1080p

# Alibaba Wan 2.2 T2V Plus 1080p

Alibaba Wan 2.2 T2V Plus 1080p

## Playground[](#playground)

[Try it on WavespeedAI!](https://wavespeed.ai/models/alibaba/wan-2.2/t2v-plus-1080p)

Generate unlimited AI videos with Alibaba WAN 2.2 text-to-video model.

## Features[](#features)

# Alibaba WAN 2.2 Text-to-Video Model (1080p)

Alibaba WAN 2.2 is an advanced **text-to-video (T2V)** model powered by an **MoE (Mixture of Experts)** architecture. It generates cinematic-quality videos at **Full HD 1080p resolution**, supporting both landscape (1920×1080) and portrait (1080×1920) formats.

* * *

## Why it looks great[](#why-it-looks-great)

*   **Cinematic quality:** controls lighting, color, and camera composition for professional results.
*   **Smooth motion:** handles subject and camera movement with stability and naturalness.
*   **Semantic alignment:** faithfully follows detailed text prompts, even in complex scenes.
*   **Prompt expansion (optional):** refine prompts automatically for enhanced output.

* * *

## Limits and Performance[](#limits-and-performance)

*   **Input:** text prompt
*   **Output resolution:** 1080p (1920×1080 or 1080×1920)
*   **Clip length per job:** 5 seconds

* * *

## Pricing[](#pricing)

Duration

Resolution

Cost per job

5 s

1080p

**$0.80**

* * *

## How to Use[](#how-to-use)

1.  **Write Prompt** – describe the scene, mood, motion, and camera style.
2.  **Choose Size** – landscape (1920×1080) or portrait (1080×1920).
3.  _(Optional)_ Add a **Negative Prompt** to exclude unwanted details.
4.  _(Optional)_ Set **Seed** for reproducibility.
5.  **Run** – preview and download your 5-second video.

* * *

## Pro tips[](#pro-tips)

*   Use **clear motion cues** in the prompt (e.g., “slow pan”, “gentle breeze”).
*   Choose **portrait mode** (1080×1920) for mobile/social content, **landscape** for cinematic use.
*   Apply **negative prompts** to avoid artifacts like text, watermarks, or distortions.
*   Enable **prompt expansion** if you want the system to refine under-specified prompts.

* * *

## Notes[](#notes)

*   Please check that your **prompt and parameters** are correct before running.
*   If results don’t align, try re-running with different seeds.

## Authentication[](#authentication)

For authentication details, please refer to the [Authentication Guide](/docs/docs-authentication).

## API Endpoints[](#api-endpoints)

### Submit Task & Query Result[](#submit-task--query-result)

cURLPythonJavaScript

```bash

# Submit the task
curl --location --request POST "https://api.wavespeed.ai/api/v3/alibaba/wan-2.2/t2v-plus-1080p" \
--header "Content-Type: application/json" \
--header "Authorization: Bearer ${WAVESPEED_API_KEY}" \
--data-raw '{
    "size": "1920*1080",
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

1920\*1080

1920\*1080, 1080\*1920

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

[Alibaba Wan 2.2 I2V Plus 480p](/docs/docs-api/alibaba/alibaba-wan-2.2-i2v-plus-480p "Alibaba Wan 2.2 I2V Plus 480p")[Alibaba Wan 2.2 T2V Plus 480p](/docs/docs-api/alibaba/alibaba-wan-2.2-t2v-plus-480p "Alibaba Wan 2.2 T2V Plus 480p")