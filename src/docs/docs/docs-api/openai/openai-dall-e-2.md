# /docs/docs-api/openai/openai-dall-e-2

来源: https://wavespeed.ai/docs/docs-api/openai/openai-dall-e-2

[WaveSpeedAI API](/docs/docs-api/webhooks "WaveSpeedAI API")OpenaiOpenai Dall E 2

# Openai Dall E 2

Openai Dall E 2

## Playground[](#playground)

[Try it on WavespeedAI!](https://wavespeed.ai/models/openai/dall-e-2)

The original classic DALLᐧE 2

## Features[](#features)

# DALL·E 2

DALL·E 2 is an AI system that creates realistic images and art from natural language descriptions. It can combine concepts, attributes, and styles to generate original content based on text prompts.

## Capabilities[](#capabilities)

*   Creates original images based on detailed text descriptions. For example, typing “a photorealistic image of an astronaut riding a horse” will generate various interpretations of this concept.

## Technical Details[](#technical-details)

*   Launched in 2022 as the successor to DALL·E (2021)
*   4x greater resolution than the original DALL·E
*   Significantly improved photorealism and caption matching
*   Based on CLIP latents (Contrastive Language-Image Pre-training)

## Safety Features[](#safety-features)

*   Content filtering to prevent generation of violent, hateful, or adult images
*   Restrictions on photorealistic generations of real individuals’ faces
*   Content policy prohibiting violent, adult, or political content generation
*   Automated and human monitoring systems

## Limitations[](#limitations)

*   Cannot generate all types of content due to safety restrictions
*   Subject to content policy restrictions
*   Other limitations documented in the risks and limitations documentation

## Authentication[](#authentication)

For authentication details, please refer to the [Authentication Guide](/docs/docs-authentication).

## API Endpoints[](#api-endpoints)

### Submit Task & Query Result[](#submit-task--query-result)

cURLPythonJavaScript

```bash

# Submit the task
curl --location --request POST "https://api.wavespeed.ai/api/v3/openai/dall-e-2" \
--header "Content-Type: application/json" \
--header "Authorization: Bearer ${WAVESPEED_API_KEY}" \
--data-raw '{
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

[Verifying Webhook](/docs/docs-api/verifying_webhook "Verifying Webhook")[Openai Dall E 3](/docs/docs-api/openai/openai-dall-e-3 "Openai Dall E 3")