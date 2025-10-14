# /docs/docs-api/wavespeed-ai/wan-2.2-i2v-480p-ultra-fast

来源: https://wavespeed.ai/docs/docs-api/wavespeed-ai/wan-2.2-i2v-480p-ultra-fast

[WaveSpeedAI API](/docs/docs-api/webhooks "WaveSpeedAI API")[Wavespeed AI](/docs/docs-api/wavespeed-ai/any-llm "Wavespeed AI")Wan 2.2 I2V 480p Ultra Fast

# Wan 2.2 I2V 480p Ultra Fast

Wan 2.2 I2V 480p Ultra Fast

## Playground[](#playground)

[Try it on WavespeedAI!](https://wavespeed.ai/models/wavespeed-ai/wan-2.2/i2v-480p-ultra-fast)

Generate unlimited AI videos with Wan 2.2 A14B image to video ultra fast model.

## Features[](#features)

# Wan-2.2-i2v-480p-ultra-fast

**wan-2.2/i2v-480p-ultra-fast** is the **ultra-fast, optimized version** of Wan 2.2, designed for **image-to-video (I2V)** generation at **480p resolution**. It leverages an innovative **Mixture of Experts (MoE)** architecture, combining high-noise and low-noise experts across denoising timesteps, enabling **faster rendering** while maintaining cinematic quality.

* * *

## Why it looks great[](#why-it-looks-great)

*   **Cinematic Aesthetics** – integrates professional film standards, controlling **lighting, color, and composition**.
*   **Natural Motion** – handles large-scale, complex movements with smoothness and controllability.
*   **Semantic Precision** – understands complex scenes and multi-object interactions, staying true to creative intent.
*   **Ultra-fast Performance** – optimized pipeline ensures **faster turnaround** without sacrificing visual fidelity.

* * *

## Limits and Performance[](#limits-and-performance)

*   **Resolution:** 480p
*   **Duration:** 5s or 8s

* * *

## Pricing[](#pricing)

Video Length

Cost (USD)

5 seconds

$0.05

8 seconds

$0.08

**Billing Rules:**

*   Minimum charge: **5 seconds**
*   Per-second rate: **$0.01**
*   Total cost = video length × $0.01

* * *

## How to Use[](#how-to-use)

1.  **Upload image** – the keyframe (first frame) or reference image for video generation.
2.  _(Optional)_ **Upload last\_image** – to guide video generation.
3.  **Enter prompt** – describe scene, camera motion, style, or action.
4.  _(Optional)_ **Set negative\_prompt** – exclude unwanted elements.
5.  **Choose duration** – default 5s, adjustable for longer clips.
6.  **Set seed** – use -1 for randomness, or fix a number for reproducibility.
7.  Click **Run** – rendering begins, optimized for ultra-fast output.

* * *

## Pro Tips[](#pro-tips)

*   Combine **image + prompt** for stronger consistency.
*   Keep prompts detailed (motion, mood, lighting) for cinematic effect.
*   Fix seed for reproducibility, change seed for variety.
*   Use short clips for best speed-to-quality balance.

* * *

## Note[](#note)

When uploading an image, please check if the URL is accessible.

*   If the URL is invalid or blocked, the model will not be able to load the image.
*   A valid image URL will display a preview in the interface.

## Authentication[](#authentication)

For authentication details, please refer to the [Authentication Guide](/docs/docs-authentication).

## API Endpoints[](#api-endpoints)

### Submit Task & Query Result[](#submit-task--query-result)

cURLPythonJavaScript

```bash

# Submit the task
curl --location --request POST "https://api.wavespeed.ai/api/v3/wavespeed-ai/wan-2.2/i2v-480p-ultra-fast" \
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

last\_image

string

No

\-

\-

The last image for generating the output.

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

duration

integer

No

5

5, 8

The duration of the generated media in seconds.

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

[Wan 2.2 I2V 480p LoRA Ultra Fast](/docs/docs-api/wavespeed-ai/wan-2.2-i2v-480p-lora-ultra-fast "Wan 2.2 I2V 480p LoRA Ultra Fast")[Wan 2.2 I2V 5b 720p](/docs/docs-api/wavespeed-ai/wan-2.2-i2v-5b-720p "Wan 2.2 I2V 5b 720p")