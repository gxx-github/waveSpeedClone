# /docs/docs-api/alibaba/alibaba-wan-2.2-i2v-plus-480p

来源: https://wavespeed.ai/docs/docs-api/alibaba/alibaba-wan-2.2-i2v-plus-480p

[WaveSpeedAI API](/docs/docs-api/webhooks "WaveSpeedAI API")[Alibaba](/docs/docs-api/alibaba/alibaba-qwen-image-translate "Alibaba")Alibaba Wan 2.2 I2V Plus 480p

# Alibaba Wan 2.2 I2V Plus 480p

Alibaba Wan 2.2 I2V Plus 480p

## Playground[](#playground)

[Try it on WavespeedAI!](https://wavespeed.ai/models/alibaba/wan-2.2/i2v-plus-480p)

Generate unlimited AI videos with Alibaba WAN 2.2 image-to-video model.

## Features[](#features)

# Alibaba WAN 2.2 Image-to-Video Plus (480p)

The **Alibaba WAN 2.2 I2V-Plus** model is a state-of-the-art image-to-video generator available on **Alibaba Cloud’s DashScope** platform. It uses an innovative **Mixture of Experts (MoE)** architecture to create smooth and realistic videos from static images at a **480p resolution**. This model is designed for short, high-quality clips.

## Why it looks great[](#why-it-looks-great)

*   **MoE architecture:** dynamically directs tasks to specialized experts for improved detail and motion accuracy.
*   **Natural motion synthesis:** creates smooth and realistic transitions from a still image.
*   **Detail preservation:** keeps sharp textures and clear faces in dynamic shots.
*   **Temporal stability:** reduces flicker and frame inconsistencies.
*   **Optimized for portraits:** excels at transforming human photos into realistic talking or moving videos.

## Limits and Performance[](#limits-and-performance)

*   **Output resolution:** fixed at **480p**
*   **Max clip length per job:** **5 seconds**
*   **Processing speed:** ~**5–10 seconds** of wall time per second of video (varies by queue and complexity)

## Pricing[](#pricing)

Output Resolution

Cost per 5 seconds

Max Length

480p

$0.20

5 seconds

## Billing Rules[](#billing-rules)

*   Minimum charge = **5 seconds (one clip)**
*   No partial billing — all jobs are billed as a 5-second generation
*   Total cost = number of clips × $0.20

## How to Use[](#how-to-use)

1.  Upload a **source image** (clear, high-quality recommended).
2.  (Optional) Add a **prompt** to guide motion or scene style.
3.  Select **output length** (5 seconds).
4.  Run the job and download the **480p video**.

## Notes[](#notes)

*   This version only supports **480p** and up to **5 seconds per clip**.
*   For longer or higher-resolution outputs, check newer WAN versions (**WAN 2.5**).

## Authentication[](#authentication)

For authentication details, please refer to the [Authentication Guide](/docs/docs-authentication).

## API Endpoints[](#api-endpoints)

### Submit Task & Query Result[](#submit-task--query-result)

cURLPythonJavaScript

```bash

# Submit the task
curl --location --request POST "https://api.wavespeed.ai/api/v3/alibaba/wan-2.2/i2v-plus-480p" \
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

No

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

[Alibaba Wan 2.2 I2V Plus 1080p](/docs/docs-api/alibaba/alibaba-wan-2.2-i2v-plus-1080p "Alibaba Wan 2.2 I2V Plus 1080p")[Alibaba Wan 2.2 T2V Plus 1080p](/docs/docs-api/alibaba/alibaba-wan-2.2-t2v-plus-1080p "Alibaba Wan 2.2 T2V Plus 1080p")