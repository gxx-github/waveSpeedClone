# /docs/docs-api/wavespeed-ai/wan-2.2-image-lora-trainer

来源: https://wavespeed.ai/docs/docs-api/wavespeed-ai/wan-2.2-image-lora-trainer

[WaveSpeedAI API](/docs/docs-api/webhooks "WaveSpeedAI API")[Wavespeed AI](/docs/docs-api/wavespeed-ai/any-llm "Wavespeed AI")Wan 2.2 Image LoRA Trainer

# Wan 2.2 Image LoRA Trainer

Wan 2.2 Image LoRA Trainer

## Playground[](#playground)

[Try it on WavespeedAI!](https://wavespeed.ai/models/wavespeed-ai/wan-2.2-image-lora-trainer)

Train custom Wan 2.2 character/style LoRA models 10x faster. Style training, character training, object training. From concept to model in minutes, not hours. Upload a ZIP file containing images to start!

## Features[](#features)

# Wan 2.2 image LoRA Trainer

Wan 2.2 LoRA Trainer is a high-performance custom model training service for the Wan 2.2 text-to-video generation model. Train personalized LoRA (Low-Rank Adaptation) models 10x faster than traditional methods, enabling custom styles, characters, and objects for video generation.

## Training Architecture[](#training-architecture)

The trainer leverages Wan 2.2’s innovative MoE (Mixture of Experts) architecture, producing two specialized LoRA models:

*   **high\_noise\_lora**: Optimized for high-noise denoising timesteps, handling initial structure and composition
*   **low\_noise\_lora**: Optimized for low-noise denoising timesteps, refining details and final output quality

This dual-model approach ensures superior training efficiency and generation quality across all denoising stages.

## Training Process[](#training-process)

1.  **Data Upload**: Upload a ZIP file containing your training images
2.  **Automatic Processing**: The system automatically processes and optimizes your dataset
3.  **Dual Model Training**: Simultaneously trains both high\_noise\_lora and low\_noise\_lora models
4.  **Model Delivery**: Receive two specialized LoRA models ready for video generation

## Authentication[](#authentication)

For authentication details, please refer to the [Authentication Guide](/docs/docs-authentication).

## API Endpoints[](#api-endpoints)

### Submit Task & Query Result[](#submit-task--query-result)

cURLPythonJavaScript

```bash

# Submit the task
curl --location --request POST "https://api.wavespeed.ai/api/v3/wavespeed-ai/wan-2.2-image-lora-trainer" \
--header "Content-Type: application/json" \
--header "Authorization: Bearer ${WAVESPEED_API_KEY}" \
--data-raw '{
    "trigger_word": "p3r5on",
    "steps": 1000,
    "learning_rate": 0.0002,
    "lora_rank": 32
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

data

string

Yes

\-

\-

To train a WAN T2V LoRA, you need to upload a zip file containing at least 10 images. In addition to images the archive can contain text files with captions. Each text file should have the same name as the image file it corresponds to.

trigger\_word

string

No

p3r5on

\-

The phrase that will trigger the model to generate an video.

steps

integer

No

1000

1000 ~ 10000

Number of steps to train the LoRA on.

learning\_rate

number

No

0.0002

0.00000 ~ 1.00000

lora\_rank

integer

No

32

1 ~ 128

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

[Wan 2.2 I2V LoRA Trainer](/docs/docs-api/wavespeed-ai/wan-2.2-i2v-lora-trainer "Wan 2.2 I2V LoRA Trainer")[Wan 2.2 Image To Image](/docs/docs-api/wavespeed-ai/wan-2.2-image-to-image "Wan 2.2 Image To Image")