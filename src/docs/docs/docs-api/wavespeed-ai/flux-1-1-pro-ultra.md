# /docs/docs-api/wavespeed-ai/flux-1.1-pro-ultra

来源: https://wavespeed.ai/docs/docs-api/wavespeed-ai/flux-1.1-pro-ultra

[WaveSpeedAI API](/docs/docs-api/webhooks "WaveSpeedAI API")[Wavespeed AI](/docs/docs-api/wavespeed-ai/any-llm "Wavespeed AI")Flux 1.1 Pro Ultra

# Flux 1.1 Pro Ultra

Flux 1.1 Pro Ultra

## Playground[](#playground)

[Try it on WavespeedAI!](https://wavespeed.ai/models/wavespeed-ai/flux-1.1-pro-ultra)

FLUX 1.1 Pro Ultra is the latest iteration of the FLUX series, offering professional-grade image quality with enhanced photorealism and support for resolutions up to 2K.

## Features[](#features)

# FLUX1.1 \[pro-ultra\]

FLUX1.1 \[pro-ultra\] delivers image generation speeds up to six times faster than the previous FLUX.1 \[pro\], while also enhancing visual fidelity, prompt accuracy, and output variety.

## Enhanced Speed and Workflow[](#enhanced-speed-and-workflow)

With reduced latency and quicker generation, FLUX1.1 \[pro-ultra\] streamlines your creative process, striking a strong balance between output quality and performance.

## Advanced Capabilities[](#advanced-capabilities)

Codenamed “blueberry” during development, FLUX1.1 \[pro-ultra\] was evaluated in the Artificial Analysis image arena—one of the leading benchmarks for text-to-image models—and outperformed all competitors, earning the top Elo rating.

The FLUX.1 series utilizes a hybrid design combining multimodal and parallel diffusion transformer modules, scaled to 12 billion parameters. By leveraging flow matching—a straightforward yet powerful approach to generative model training that generalizes diffusion—these models surpass previous diffusion-based methods. Additional improvements include rotary positional embeddings and parallel attention, boosting both model capability and hardware efficiency.

## Authentication[](#authentication)

For authentication details, please refer to the [Authentication Guide](/docs/docs-authentication).

## API Endpoints[](#api-endpoints)

### Submit Task & Query Result[](#submit-task--query-result)

cURLPythonJavaScript

```bash

# Submit the task
curl --location --request POST "https://api.wavespeed.ai/api/v3/wavespeed-ai/flux-1.1-pro-ultra" \
--header "Content-Type: application/json" \
--header "Authorization: Bearer ${WAVESPEED_API_KEY}" \
--data-raw '{
    "aspect_ratio": "1:1",
    "output_format": "jpg",
    "raw": false,
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

output\_format

string

No

jpg

jpg, png

The format of the output image.

raw

boolean

No

false

\-

Generate less processed, more natural-looking images.

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

[Flux 1.1 Pro](/docs/docs-api/wavespeed-ai/flux-1.1-pro "Flux 1.1 Pro")[Flux Controlnet Union Pro 2.0](/docs/docs-api/wavespeed-ai/flux-controlnet-union-pro-2.0 "Flux Controlnet Union Pro 2.0")