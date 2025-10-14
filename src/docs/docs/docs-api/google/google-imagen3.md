# /docs/docs-api/google/google-imagen3

来源: https://wavespeed.ai/docs/docs-api/google/google-imagen3

[WaveSpeedAI API](/docs/docs-api/webhooks "WaveSpeedAI API")[Google](/docs/docs-api/google/google-gemini-2.5-flash-image-edit "Google")Google Imagen3

# Google Imagen3

Google Imagen3

## Playground[](#playground)

[Try it on WavespeedAI!](https://wavespeed.ai/models/google/imagen3)

Google’s highest quality text-to-image model, capable of generating images with detail, rich lighting and beauty

## Features[](#features)

## Imagen 3[](#imagen-3)

Imagen 3 is DeepMind’s latest text-to-image generative model, focusing on high-quality image generation with improved detail, lighting, and reduced artifacts.

## Core Capabilities[](#core-capabilities)

*   Enhanced prompt understanding for complex image generation tasks
    
*   Improved text rendering for applications like presentations and typography
    
*   Support for diverse artistic styles from photorealism to animation
    
*   Better handling of lighting, textures, and fine details
    
*   Natural language prompt processing without requiring complex prompt engineering
    

## Technical Improvements[](#technical-improvements)

## Image Quality[](#image-quality)

*   Enhanced color balance and vibrancy
    
*   Improved texture rendering
    
*   Better detail preservation in complex scenes
    
*   Reduced artifact generation
    
*   More accurate style reproduction across different artistic genres
    

## Prompt Processing[](#prompt-processing)

*   Support for longer, more detailed prompts
    
*   Better understanding of camera angles and composition requirements
    
*   Improved handling of specific style requests
    
*   Enhanced text rendering capabilities
    

## Benchmarks[](#benchmarks)

Performance metrics based on human evaluation using GenAI-Bench:

*   Highest score for visual quality among compared models
    
*   High accuracy in prompt response adherence
    
*   Strong performance in overall preference benchmarks
    

Detailed benchmark methodology and results are available in Appendix D of the technical report.

## Security Features[](#security-features)

*   Built-in content filtering system
    
*   Dataset filtering to minimize harmful content
    
*   SynthID watermarking integration for image identification
    
*   Extensive red teaming and evaluations for: Fairness, Bias, Content safety
    

## Technical Documentation[](#technical-documentation)

For detailed technical specifications and methodology, refer to the full technical report.

## Authentication[](#authentication)

For authentication details, please refer to the [Authentication Guide](/docs/docs-authentication).

## API Endpoints[](#api-endpoints)

### Submit Task & Query Result[](#submit-task--query-result)

cURLPythonJavaScript

```bash

# Submit the task
curl --location --request POST "https://api.wavespeed.ai/api/v3/google/imagen3" \
--header "Content-Type: application/json" \
--header "Authorization: Bearer ${WAVESPEED_API_KEY}" \
--data-raw '{
    "aspect_ratio": "1:1",
    "num_images": 1,
    "enable_base64_output": false
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

aspect\_ratio

string

No

1:1

1:1, 16:9, 9:16, 4:3, 3:4

The aspect ratio of the generated media.

num\_images

integer

No

1

1 ~ 4

The number of images to generate.

negative\_prompt

string

No

\-

The negative prompt for the generation.

seed

integer

No

\-

\-1 ~ 2147483647

The random seed to use for the generation.

enable\_base64\_output

boolean

No

false

\-

If enabled, the output will be encoded into a BASE64 string instead of a URL. This property is only available through the API.

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

[Google Gemini 2.5 Flash Image Text To Image](/docs/docs-api/google/google-gemini-2.5-flash-image-text-to-image "Google Gemini 2.5 Flash Image Text To Image")[Google Imagen3 Fast](/docs/docs-api/google/google-imagen3-fast "Google Imagen3 Fast")