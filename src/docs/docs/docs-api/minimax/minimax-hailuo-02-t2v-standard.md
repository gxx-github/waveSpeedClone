# /docs/docs-api/minimax/minimax-hailuo-02-t2v-standard

来源: https://wavespeed.ai/docs/docs-api/minimax/minimax-hailuo-02-t2v-standard

[WaveSpeedAI API](/docs/docs-api/webhooks "WaveSpeedAI API")[Minimax](/docs/docs-api/minimax/minimax-hailuo-02-fast "Minimax")Minimax Hailuo 02 T2V Standard

# Minimax Hailuo 02 T2V Standard

Minimax Hailuo 02 T2V Standard

## Playground[](#playground)

[Try it on WavespeedAI!](https://wavespeed.ai/models/minimax/hailuo-02/t2v-standard)

Hailuo 02 is a new AI video generation model, from Hailuo AI, created on MiniMax’s evolving framework. It has been fine-tuned to deliver ultra-clear 1080P resolution and unprecedented responsiveness while even handling, the craziest of physics driven scenes.

## Features[](#features)

# Hailuo 02

Hailuo 02 is the latest **AI video generation model**, advanced physics rendering, and cinematic scene transitions. Built for creators and professionals, it offers both **quality** and **affordability**, outperforming many closed or premium systems.

## Why it looks great[](#why-it-looks-great)

*   **Multiple durations:** supports both **6-second** and **10-second** clips.
*   **Enhanced motion & physics:** understands complex dynamics like water, debris, and camera shakes.
*   **Smooth scene transitions:** avoids awkward cuts and produces cinematic flow.
*   **Consistent reliability:** repeatable results across the same prompts.
*   **Affordable cost:** professional quality at a fraction of competitor prices.

## Limits and Performance[](#limits-and-performance)

*   **Output resolution:** fixed at **1080p**
*   **Max clip length per job:** **10 seconds**
*   **Duration options:** **6s** or **10s**
*   **Processing speed:** ~**30–90 seconds** wall time per clip (depends on complexity and queue load)

## Pricing[](#pricing)

Duration

Cost per job

Max Resolution

6 seconds

$0.23

1080p

10 seconds

$0.56

1080p

## Billing Rules[](#billing-rules)

*   Flat billing per clip (6s or 10s)
*   No partial billing — shorter clips still cost the same as their duration tier
*   Total cost = number of clips × rate

## How to Use[](#how-to-use)

1.  Write a **prompt** describing the scene, lighting, or motion.
2.  Select **duration** (6s or 10s).
3.  Submit the job.
4.  Download your generated video.

## Pro tips for best quality[](#pro-tips-for-best-quality)

*   Write **cinematic prompts** (angles, lighting, mood).
*   Use **action verbs** (“zoom in,” “pan left,” “fly over”) for dynamic camera effects.
*   Start with **6-second clips** for quick iterations.
*   Combine multiple clips for longer sequences.
*   Pair videos with your own **music or voiceovers** for full storytelling.

## Authentication[](#authentication)

For authentication details, please refer to the [Authentication Guide](/docs/docs-authentication).

## API Endpoints[](#api-endpoints)

### Submit Task & Query Result[](#submit-task--query-result)

cURLPythonJavaScript

```bash

# Submit the task
curl --location --request POST "https://api.wavespeed.ai/api/v3/minimax/hailuo-02/t2v-standard" \
--header "Content-Type: application/json" \
--header "Authorization: Bearer ${WAVESPEED_API_KEY}" \
--data-raw '{
    "duration": 6,
    "enable_prompt_expansion": true
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

duration

integer

No

6

6, 10

The duration of the generated media in seconds.

enable\_prompt\_expansion

boolean

No

true

\-

The model automatically optimizes incoming prompts to enhance output quality. This also activates the safety checker, which ensures content safety by detecting and filtering potential risks.

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

[Minimax Hailuo 02 T2V Pro](/docs/docs-api/minimax/minimax-hailuo-02-t2v-pro "Minimax Hailuo 02 T2V Pro")[Minimax Music V1.5](/docs/docs-api/minimax/minimax-music-v1.5 "Minimax Music V1.5")