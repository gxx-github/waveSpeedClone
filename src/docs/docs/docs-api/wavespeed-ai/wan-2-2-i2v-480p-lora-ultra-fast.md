# /docs/docs-api/wavespeed-ai/wan-2.2-i2v-480p-lora-ultra-fast

来源: https://wavespeed.ai/docs/docs-api/wavespeed-ai/wan-2.2-i2v-480p-lora-ultra-fast

[WaveSpeedAI API](/docs/docs-api/webhooks "WaveSpeedAI API")[Wavespeed AI](/docs/docs-api/wavespeed-ai/any-llm "Wavespeed AI")Wan 2.2 I2V 480p LoRA Ultra Fast

# Wan 2.2 I2V 480p LoRA Ultra Fast

Wan 2.2 I2V 480p LoRA Ultra Fast

## Playground[](#playground)

[Try it on WavespeedAI!](https://wavespeed.ai/models/wavespeed-ai/wan-2.2/i2v-480p-lora-ultra-fast)

Generate unlimited AI videos with Wan 2.2 A14B image to video model, supporting custom LoRAs.

## Features[](#features)

# Wan-2.2-i2v-480p-lora-ultra-fast

Wan 2.2 (Ultra-Fast 480p, with LoRA) is a **high-speed** multimodal video generation model. It delivers cinematic-quality results at **ultra-fast inference speed**, with support for up to 3 LoRAs per job for flexible style and character control.

*   [Wan-2.2-i2v-480p-lora](https://wavespeed.ai/models/wavespeed-ai/wan-2.2/i2v-480p-lora)
*   [Wan-2.2/i2v-480p-ultra-fast](https://wavespeed.ai/models/wavespeed-ai/wan-2.2/i2v-480p-ultra-fast)

* * *

## Key Features[](#key-features)

*   **Cinematic-level Aesthetic Control:** Professional camera language, multi-dimensional control over **lighting, color, and composition**.
    
*   **Large-scale Complex Motion:** Smoothly restores **natural motion**, supports multi-subject dynamics, and enhances controllability.
    
*   **Precise Semantic Compliance:** Excels at **complex scene understanding** and **multi-object generation**, ensuring faithful creative intent.
    
*   **LoRA Integration:** Import up to **3 LoRAs per job** for both **high-noise** and **low-noise experts**, with adjustable blending scale.
    

* * *

## Limits and Performance[](#limits-and-performance)

*   **Resolution**: 480p
    
*   **Duration options**: 5s or 8s
    
*   **Input types**:
    
    *   **Prompt**
    *   **Image** (First Frame)
    *   **Last Image** (Last Frame)
*   **LoRAs**: up to **3 high-noise LoRAs** + **3 low-noise LoRAs** or just **3 LoRAs**
    
*   **Seed**: reproducibility control
    

* * *

## Pricing[](#pricing)

Duration

Cost

5 seconds

$0.10

8 seconds

$0.16

* * *

## How to Use[](#how-to-use)

1.  Upload an **initial image**.
2.  Write a **prompt** describing the video scene.
3.  (Optional) Add a **last\_image** for smooth transitions.
4.  Select **duration** (5s or 8s).
5.  Add **LoRAs** (up to 3 for high-noise experts, 3 for low-noise experts).
6.  (Optional) Set a **seed** for reproducibility.
7.  Run the job and preview/download your video.

* * *

## Pro Tips[](#pro-tips)

*   Use **image + last\_image** for storyboarding transitions.
*   Apply **high-noise LoRAs** for global style changes, and **low-noise LoRAs** for subtle refinements.
*   Keep LoRA **scale values balanced** (0.5–1.0 recommended) for natural blending.
*   Choose **5s for quick iterations** and **8s for polished results**.

* * *

## Note[](#note)

*   If you did not upload the image locally, please ensure that the image URL is accessible! A successfully accessible image will display a preview in the interface.

* * *

## Reference[](#reference)

*   [Use your LoRA](https://wavespeed.ai/blog/posts/Stop-TrainingStart-Creating-Use-LoRA-on-WaveSpeedAI)
*   [Train your LoRA](https://wavespeed.ai/blog/posts/How-to-Train-Your-Own-LoRA-Model-Without-Coding)

## Authentication[](#authentication)

For authentication details, please refer to the [Authentication Guide](/docs/docs-authentication).

## API Endpoints[](#api-endpoints)

### Submit Task & Query Result[](#submit-task--query-result)

cURLPythonJavaScript

```bash

# Submit the task
curl --location --request POST "https://api.wavespeed.ai/api/v3/wavespeed-ai/wan-2.2/i2v-480p-lora-ultra-fast" \
--header "Content-Type: application/json" \
--header "Authorization: Bearer ${WAVESPEED_API_KEY}" \
--data-raw '{
    "duration": 5,
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

negative\_prompt

string

No

\-

The negative prompt for the generation.

last\_image

string

No

\-

\-

The last image for generating the output.

duration

integer

No

5

5, 8

The duration of the generated media in seconds.

loras

array

No

max 3 items

List of LoRAs to apply (max 3).

loras\[\].path

string

Yes

\-

Path to the LoRA model

loras\[\].scale

float

Yes

\-

0.0 ~ 4.0

Scale of the LoRA model

high\_noise\_loras

array

No

\-

\-

List of high noise LoRAs to apply (max 3).

low\_noise\_loras

array

No

\-

\-

List of low noise LoRAs to apply (max 3).

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

[Wan 2.2 I2V 480p LoRA](/docs/docs-api/wavespeed-ai/wan-2.2-i2v-480p-lora "Wan 2.2 I2V 480p LoRA")[Wan 2.2 I2V 480p Ultra Fast](/docs/docs-api/wavespeed-ai/wan-2.2-i2v-480p-ultra-fast "Wan 2.2 I2V 480p Ultra Fast")