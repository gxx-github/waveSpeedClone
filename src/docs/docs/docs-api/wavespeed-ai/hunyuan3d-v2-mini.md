# /docs/docs-api/wavespeed-ai/hunyuan3d-v2-mini

来源: https://wavespeed.ai/docs/docs-api/wavespeed-ai/hunyuan3d-v2-mini

[WaveSpeedAI API](/docs/docs-api/webhooks "WaveSpeedAI API")[Wavespeed AI](/docs/docs-api/wavespeed-ai/any-llm "Wavespeed AI")Hunyuan3d V2 Mini

# Hunyuan3d V2 Mini

Hunyuan3d V2 Mini

## Playground[](#playground)

[Try it on WavespeedAI!](https://wavespeed.ai/models/wavespeed-ai/hunyuan3d/v2-mini)

Hunyuan3D-V2-Mini is a state-of-the-art image-to-3D generative model developed by Tencent and now available on WaveSpeedAI.

## Features[](#features)

# Hunyuan3D-V2-Mini

Hunyuan3D-2 is an open-source 3D generation model series launched by Tencent. As of March 2025, supporting the generation of high-fidelity 3D models with high-resolution texture maps through text, image, or sketch inputs.

## Technical Highlights[](#technical-highlights)

The system adopts a separated process of geometry generation + texture synthesis:

\-Geometry Generation (Hunyuan3D-DiT): Based on a flow diffusion model that generates untextured 3D geometric models, with 2.6B parameters, capable of precisely extracting geometric information from input images or text.

*   Texture Synthesis (Hunyuan3D-Paint): Adds high-resolution (4K) textures to geometric models, with 1.3B parameters, supporting multi-view diffusion generation technology to ensure realistic textures and consistent lighting.
*   By decoupling shape and texture generation, it effectively reduces complexity and improves generation quality.

## Performance and Efficiency Optimization[](#performance-and-efficiency-optimization)

*   Fast Generation: Completes model generation in as fast as 30 seconds, with the accelerated version (Hunyuan3D-DiT-v2-0-Fast) shortening inference time by 50% through guidance distillation techniques.
*   Multi-modal Input: Supports various input methods including text descriptions, images, and sketches, compatible with Blender plugins and Gradio applications, lowering the usage threshold.
*   Open Source Model Ecosystem The project has open-sourced 6 models (some simplified versions), covering different scenario needs:

## Authentication[](#authentication)

For authentication details, please refer to the [Authentication Guide](/docs/docs-authentication).

## API Endpoints[](#api-endpoints)

### Submit Task & Query Result[](#submit-task--query-result)

cURLPythonJavaScript

```bash

# Submit the task
curl --location --request POST "https://api.wavespeed.ai/api/v3/wavespeed-ai/hunyuan3d/v2-mini" \
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

[Hunyuan3d V2 Base](/docs/docs-api/wavespeed-ai/hunyuan3d-v2-base "Hunyuan3d V2 Base")[Hunyuan3d V2 Multi View](/docs/docs-api/wavespeed-ai/hunyuan3d-v2-multi-view "Hunyuan3d V2 Multi View")