# /docs/docs-api/alibaba/alibaba-wan-2.2-t2v-plus-480p

来源: https://wavespeed.ai/docs/docs-api/alibaba/alibaba-wan-2.2-t2v-plus-480p

[WaveSpeedAI API](/docs/docs-api/webhooks "WaveSpeedAI API")[Alibaba](/docs/docs-api/alibaba/alibaba-qwen-image-translate "Alibaba")Alibaba Wan 2.2 T2V Plus 480p

# Alibaba Wan 2.2 T2V Plus 480p

Alibaba Wan 2.2 T2V Plus 480p

## Playground[](#playground)

[Try it on WavespeedAI!](https://wavespeed.ai/models/alibaba/wan-2.2/t2v-plus-480p)

Generate unlimited AI videos with Alibaba WAN 2.2 text-to-video model.

## Features[](#features)

# Alibaba WAN 2.2 Text-to-Video Model (480p)

Alibaba WAN 2.2 is an advanced text-to-video model provided by Alibaba Cloud’s DashScope platform. This model adopts an innovative MoE (Mixture of Experts) architecture for generating high-quality video content at 480p resolution.

* * *

## Why it looks great[](#why-it-looks-great)

*   **Cinematic Aesthetics** – professional-level control of lighting, color, and composition, delivering a true film-quality look.
*   **Natural Motion** – restores complex movements with smooth transitions and precise controllability.
*   **Semantic Precision** – understands complex scenes and multi-object interactions, keeping your creative intent intact.
*   **Multimodal Power** – supports both text-to-video and image-to-video, flexible for storytelling, education, and creative content.

* * *

## Pricing[](#pricing)

Video Length

Cost (USD)

5 seconds

$0.05

* * *

## How to Use[](#how-to-use)

1.  **Enter your prompt** – describe the scene (e.g., camera angle, action, lighting).
2.  _(Optional)_ **Add a negative\_prompt** – specify what you don’t want in the video.
3.  **Set size** – choose output resolution (e.g., 832×480 or 480×832).
4.  **Set seed** – use -1 for random results, or fix a number for reproducibility.
5.  Click **Run** – preview and download your generated video.

## Authentication[](#authentication)

For authentication details, please refer to the [Authentication Guide](/docs/docs-authentication).

## API Endpoints[](#api-endpoints)

### Submit Task & Query Result[](#submit-task--query-result)

cURLPythonJavaScript

```bash

# Submit the task
curl --location --request POST "https://api.wavespeed.ai/api/v3/alibaba/wan-2.2/t2v-plus-480p" \
--header "Content-Type: application/json" \
--header "Authorization: Bearer ${WAVESPEED_API_KEY}" \
--data-raw '{
    "size": "832*480",
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

832\*480

832\*480, 480\*832

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

[Alibaba Wan 2.2 T2V Plus 1080p](/docs/docs-api/alibaba/alibaba-wan-2.2-t2v-plus-1080p "Alibaba Wan 2.2 T2V Plus 1080p")[Alibaba Wan 2.5 Image Edit](/docs/docs-api/alibaba/alibaba-wan-2.5-image-edit "Alibaba Wan 2.5 Image Edit")