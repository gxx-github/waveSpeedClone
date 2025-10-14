# /docs/docs-api/ideogram-ai/ideogram-ai-ideogram-character

来源: https://wavespeed.ai/docs/docs-api/ideogram-ai/ideogram-ai-ideogram-character

[WaveSpeedAI API](/docs/docs-api/webhooks "WaveSpeedAI API")Ideogram AIIdeogram AI Ideogram Character

# Ideogram Ai Ideogram Character

Ideogram Ai Ideogram Character

## Playground[](#playground)

[Try it on WavespeedAI!](https://wavespeed.ai/models/ideogram-ai/ideogram-character)

Generate consistent characters from a single reference image. Outputs can be in many styles. You can also use inpainting to add your character to an existing image.

## Features[](#features)

# Ideogram Character

Ideogram Character is a character consistency model designed to generate variations of characters using a single reference image. The model maintains visual consistency across different scenes and contexts while preserving the core identity of the subject, working with both real and fictional characters.

## Core Functionality[](#core-functionality)

The model operates by taking a single reference photograph and generating variations of the character depicted. It maintains fidelity to the original character while adapting them to new environments, contexts, and artistic styles. Character definition is handled automatically through facial and hair detection algorithms that identify key features defining the character’s identity.

## Technical Specifications[](#technical-specifications)

### Input Requirements[](#input-requirements)

*   Single reference image with clear facial features
*   Text prompts for scene description

### Processing Method[](#processing-method)

The system processes input images by automatically detecting facial features and hair characteristics that form the core identity map. This map is preserved across all generated variations, ensuring character consistency regardless of the new context or style applied.

## Applications and Limitations[](#applications-and-limitations)

The model excels at maintaining character consistency across varied scenarios, supporting contextual placement in new environments, artistic style transfers, and scene composition. Performance depends heavily on reference image quality, with clear facial features being essential for optimal results.

Complex poses, extreme viewing angles, or poor image quality may impact consistency. Additionally, aggressive style transfers may sometimes compromise fine detail preservation in favor of stylistic adaptation.

## Authentication[](#authentication)

For authentication details, please refer to the [Authentication Guide](/docs/docs-authentication).

## API Endpoints[](#api-endpoints)

### Submit Task & Query Result[](#submit-task--query-result)

cURLPythonJavaScript

```bash

# Submit the task
curl --location --request POST "https://api.wavespeed.ai/api/v3/ideogram-ai/ideogram-character" \
--header "Content-Type: application/json" \
--header "Authorization: Bearer ${WAVESPEED_API_KEY}" \
--data-raw '{
    "style": "Auto",
    "rendering_speed": "Default",
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

Yes

\-

An image to use as a character reference.

style

string

No

Auto

Auto, Fiction, Realistic

The character style type. Auto, Fiction, or Realistic.

rendering\_speed

string

No

Default

Default, Turbo, Quality

Rendering speed. Turbo for faster and cheaper generation, quality for higher quality and more expensive generation, default for balanced.

aspect\_ratio

string

No

1:1

1:1, 16:9, 9:16, 4:3, 3:4

The aspect ratio of the generated media.

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

[Pixverse Pixverse V5 Transition](/docs/docs-api/pixverse/pixverse-pixverse-v5-transition "Pixverse Pixverse V5 Transition")[Ideogram AI Ideogram V2](/docs/docs-api/ideogram-ai/ideogram-ai-ideogram-v2 "Ideogram AI Ideogram V2")