# /docs/docs-api/ideogram-ai/ideogram-ai-ideogram-v3-balanced

来源: https://wavespeed.ai/docs/docs-api/ideogram-ai/ideogram-ai-ideogram-v3-balanced

[WaveSpeedAI API](/docs/docs-api/webhooks "WaveSpeedAI API")[Ideogram AI](/docs/docs-api/ideogram-ai/ideogram-ai-ideogram-character "Ideogram AI")Ideogram AI Ideogram V3 Balanced

# Ideogram Ai Ideogram V3 Balanced

Ideogram Ai Ideogram V3 Balanced

## Playground[](#playground)

[Try it on WavespeedAI!](https://wavespeed.ai/models/ideogram-ai/ideogram-v3-balanced)

The highest quality Ideogram v3 model. v3 creates images with stunning realism, creative designs, and consistent styles

## Features[](#features)

# Ideogram 3.0

Ideogram 3.0 is a cutting-edge text-to-image AI model, offering three distinct tiers to match your needs:

*   **Turbo**: Lightning-fast generation at just $0.03/image - perfect for rapid iterations
*   **Balanced**: Optimal speed-quality ratio at $0.06/image - ideal for most use cases
*   **Quality**: Premium output at $0.09/image - when excellence is paramount

## Key Features[](#key-features)

### Advanced Style Control[](#advanced-style-control)

*   Upload up to 3 reference images to precisely guide generation aesthetics
*   Access 4.3 billion style presets through the innovative Random Style feature
*   Save and reuse your favorite styles with Style Codes for consistent branding

### Professional Text Rendering[](#professional-text-rendering)

*   Industry-leading text generation for professional graphic design
*   Seamless handling of complex, multi-line text compositions
*   Superior typesetting with precise layout control

### Enhanced Visual Quality[](#enhanced-visual-quality)

*   Masterful spatial composition and arrangement
*   Fine-tuned lighting and color management
*   Rich environmental detail rendering
*   Photorealistic output with exceptional clarity

## Perfect For[](#perfect-for)

*   Professional graphic design and branding
*   Digital and print advertising campaigns
*   Marketing collateral creation
*   Small business visual identity development
*   Logo and brand asset design
*   High-quality promotional materials
*   Professional product photography alternatives

Experience the next evolution in AI-powered image generation with Ideogram 3.0’s enhanced image-prompt alignment, superior photorealism, and unmatched text rendering capabilities.

## Authentication[](#authentication)

For authentication details, please refer to the [Authentication Guide](/docs/docs-authentication).

## API Endpoints[](#api-endpoints)

### Submit Task & Query Result[](#submit-task--query-result)

cURLPythonJavaScript

```bash

# Submit the task
curl --location --request POST "https://api.wavespeed.ai/api/v3/ideogram-ai/ideogram-v3-balanced" \
--header "Content-Type: application/json" \
--header "Authorization: Bearer ${WAVESPEED_API_KEY}" \
--data-raw '{
    "style": "Auto",
    "aspect_ratio": "1:1",
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

image

string

No

\-

The image to generate an image from.

mask\_image

string

No

\-

The mask image tells the model where to generate new pixels (white) and where to preserve the original image (black). It acts as a stencil or guide for targeted image editing.

style

string

No

Auto

Auto, General, Realistic, Design

The style of the generated image.

aspect\_ratio

string

No

1:1

1:1, 16:9, 9:16, 4:3, 3:4

The aspect ratio of the generated media.

reference\_images

array

No

\-

\-

A list of images to use as style references.

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

[Ideogram AI Ideogram V2A Turbo](/docs/docs-api/ideogram-ai/ideogram-ai-ideogram-v2a-turbo "Ideogram AI Ideogram V2A Turbo")[Ideogram AI Ideogram V3 Quality](/docs/docs-api/ideogram-ai/ideogram-ai-ideogram-v3-quality "Ideogram AI Ideogram V3 Quality")