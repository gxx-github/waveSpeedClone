# /docs/docs-api/wavespeed-ai/wan-2.2-i2v-lora-trainer

来源: https://wavespeed.ai/docs/docs-api/wavespeed-ai/wan-2.2-i2v-lora-trainer

[WaveSpeedAI API](/docs/docs-api/webhooks "WaveSpeedAI API")[Wavespeed AI](/docs/docs-api/wavespeed-ai/any-llm "Wavespeed AI")Wan 2.2 I2V LoRA Trainer

# Wan 2.2 I2V LoRA Trainer

Wan 2.2 I2V LoRA Trainer

## Playground[](#playground)

[Try it on WavespeedAI!](https://wavespeed.ai/models/wavespeed-ai/wan-2.2-i2v-lora-trainer)

Train custom Wan 2.2 I2V LoRA models 10x faster. Action training, motion training, video efect training. From concept to model in minutes, not hours. Upload a ZIP file containing videos to start!

## Features[](#features)

# Wan 2.2 I2V LoRA Trainer

Wan 2.2 I2V (Image-to-Video) LoRA Trainer is a specialized training service for creating custom LoRA models optimized for image-to-video generation. Train personalized models 10x faster using video datasets to achieve action and video effect generation from static images.

## Training Architecture[](#training-architecture)

Built on Wan 2.2’s advanced MoE (Mixture of Experts) architecture, the trainer generates two specialized LoRA models:

*   **high\_noise\_lora**: Optimized for high-noise denoising timesteps, handling initial motion planning and temporal structure
*   **low\_noise\_lora**: Optimized for low-noise denoising timesteps, refining motion details and ensuring smooth transitions

This dual-model approach ensures superior image-to-video conversion quality with consistent temporal coherence.

## Training Process[](#training-process)

1.  **Video Data Upload**: Upload a ZIP file containing your training video sequences
2.  **Temporal Analysis**: The system analyzes motion patterns and temporal relationships
3.  **Dual Model Training**: Simultaneously trains both high\_noise\_lora and low\_noise\_lora models
4.  **Motion Optimization**: Fine-tunes models for smooth image-to-video transitions
5.  **Model Delivery**: Receive two specialized LoRA models optimized for I2V generation

## Authentication[](#authentication)

For authentication details, please refer to the [Authentication Guide](/docs/docs-authentication).

## API Endpoints[](#api-endpoints)

### Submit Task & Query Result[](#submit-task--query-result)

cURLPythonJavaScript

```bash

# Submit the task
curl --location --request POST "https://api.wavespeed.ai/api/v3/wavespeed-ai/wan-2.2-i2v-lora-trainer" \
--header "Content-Type: application/json" \
--header "Authorization: Bearer ${WAVESPEED_API_KEY}" \
--data-raw '{
    "trigger_word": "p3r5on",
    "steps": 100,
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

To train a WAN I2V LoRA, you need to upload a zip file containing videos. In addition to videos the archive can contain text files with captions. Each text file should have the same name as the video file it corresponds to.

trigger\_word

string

No

p3r5on

\-

The phrase that will trigger the model to generate an video.

steps

integer

No

100

50 ~ 1500

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

[Wan 2.2 I2V 720p Ultra Fast](/docs/docs-api/wavespeed-ai/wan-2.2-i2v-720p-ultra-fast "Wan 2.2 I2V 720p Ultra Fast")[Wan 2.2 Image LoRA Trainer](/docs/docs-api/wavespeed-ai/wan-2.2-image-lora-trainer "Wan 2.2 Image LoRA Trainer")