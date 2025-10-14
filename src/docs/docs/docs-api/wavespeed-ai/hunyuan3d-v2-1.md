# /docs/docs-api/wavespeed-ai/hunyuan3d-v2.1

来源: https://wavespeed.ai/docs/docs-api/wavespeed-ai/hunyuan3d-v2.1

[WaveSpeedAI API](/docs/docs-api/webhooks "WaveSpeedAI API")[Wavespeed AI](/docs/docs-api/wavespeed-ai/any-llm "Wavespeed AI")Hunyuan3d V2.1

# Hunyuan3d V2.1

Hunyuan3d V2.1

## Playground[](#playground)

[Try it on WavespeedAI!](https://wavespeed.ai/models/wavespeed-ai/hunyuan3d/v2.1)

Tencent Hunyuan3D-2.1 a scalable 3D asset creation system that advances state-of-the-art 3D generation

## Features[](#features)

# Hunyuan3D-v2.1

Tencent Hunyuan3D-2.1 is a scalable 3D asset creation system that advances state-of-the-art 3D generation through two pivotal innovations: Fully Open-Source Framework and Physically-Based Rendering (PBR) Texture Synthesis. For the first time, the system releases full model weights and training code, enabling community developers to directly fine-tune and extend the model for diverse downstream applications. This transparency accelerates academic research and industrial deployment. Moreover, replacing the prior RGB-based texture model, the upgraded PBR pipeline leverages physics-grounded material simulation to generate textures with photorealistic light interaction (e.g., metallic reflections, subsurface scattering).

## Authentication[](#authentication)

For authentication details, please refer to the [Authentication Guide](/docs/docs-authentication).

## API Endpoints[](#api-endpoints)

### Submit Task & Query Result[](#submit-task--query-result)

cURLPythonJavaScript

```bash

# Submit the task
curl --location --request POST "https://api.wavespeed.ai/api/v3/wavespeed-ai/hunyuan3d/v2.1" \
--header "Content-Type: application/json" \
--header "Authorization: Bearer ${WAVESPEED_API_KEY}" \
--data-raw '{}'

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

URL of image to use while generating the 3D model.

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

[Hunyuan3d V2 Multi View](/docs/docs-api/wavespeed-ai/hunyuan3d-v2-multi-view "Hunyuan3d V2 Multi View")[Image Background Remover](/docs/docs-api/wavespeed-ai/image-background-remover "Image Background Remover")