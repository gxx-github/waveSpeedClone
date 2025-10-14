# /docs/docs-api/kwaivgi/kwaivgi-kling-v1.6-multi-i2v-standard

来源: https://wavespeed.ai/docs/docs-api/kwaivgi/kwaivgi-kling-v1.6-multi-i2v-standard

[WaveSpeedAI API](/docs/docs-api/webhooks "WaveSpeedAI API")[Kwaivgi](/docs/docs-api/kwaivgi/kwaivgi-kling-effects "Kwaivgi")Kwaivgi Kling V1.6 Multi I2V Standard

# Kwaivgi Kling V1.6 Multi I2V Standard

Kwaivgi Kling V1.6 Multi I2V Standard

## Playground[](#playground)

[Try it on WavespeedAI!](https://wavespeed.ai/models/kwaivgi/kling-v1.6-multi-i2v-standard)

Kling AI released its latest 1.6 model on Dec 19, 2024. The new model boasts a remarkable 195% improvement in image-to-video generation capabilities compared to Kling 1.5, with a better understanding of prompts and enhanced physics and visual effects, setting a new benchmark in AI video creation.

## Features[](#features)

# Kling AI 1.6 Key Features

*   **Improved prompt adherence**  
    Delivers more precise and fitting responses to user instructions, especially for motion, camera angles, and sequential movements.
    
*   **Upgraded motion dynamics**  
    Produces more natural and lifelike movements and facial expressions, making character actions fluid and realistic.
    
*   **Enhanced image-to-video quality**  
    Offers superior color rendering, detailed visuals, realistic lighting and shadows, and consistent style for refined, high-quality videos.
    
*   **Dual mode approach**  
    Supports both Standard mode for quick video creation and Professional mode for advanced customization and higher-quality production.
    

* * *

## Improved Prompt Adherence[](#improved-prompt-adherence)

Kling 1.6 understands user prompts more intelligently, ensuring dynamic and consistent results aligned with expectations.

**Sample:**  
_Original image:_ girl riding broom  
_Prompt:_ Create an anime-style scene of a girl riding a broom in the sky with a black cat. Zoom in to a close-up of the girl’s face as she looks ahead with curiosity.

* * *

## Upgraded Motion Dynamics[](#upgraded-motion-dynamics)

Delivers the most realistic human movements and facial expressions, from jumping and punching to subtle gestures, with fluidity almost indistinguishable from real life.

**Sample:**  
_Original image:_ kung fu master  
_Prompt:_ A Kung Fu master throws a punch, and the air behind him swirls into the shape of a dragon.

* * *

## Enhanced Image-to-Video Quality[](#enhanced-image-to-video-quality)

Features dynamic color rendering, detailed aesthetics, realistic lighting and shadows, and style consistency, producing visually impactful and polished videos.

**Sample:**  
_Original image:_ mechanical wolf  
_Prompt:_ A mechanical wolf rises slowly, spreading its limbs smoothly. The camera moves upward as its blue eyes narrow slightly. Neon lights flicker in the background, creating a mysterious futuristic atmosphere.

* * *

## Dual Model Support[](#dual-model-support)

*   **Standard mode:** Quick and easy AI video creation.
*   **Professional mode:** Advanced customization for higher-quality, creative video production.

* * *

## No Extra Costs[](#no-extra-costs)

All new features and improvements in Kling 1.6 are available to users at no additional cost.

## Authentication[](#authentication)

For authentication details, please refer to the [Authentication Guide](/docs/docs-authentication).

## API Endpoints[](#api-endpoints)

### Submit Task & Query Result[](#submit-task--query-result)

cURLPythonJavaScript

```bash

# Submit the task
curl --location --request POST "https://api.wavespeed.ai/api/v3/kwaivgi/kling-v1.6-multi-i2v-standard" \
--header "Content-Type: application/json" \
--header "Authorization: Bearer ${WAVESPEED_API_KEY}" \
--data-raw '{
    "duration": 5,
    "aspect_ratio": "1:1"
}'

# Get the result
curl --location --request GET "https://api.wavespeed.ai/v3/predictions/${requestId}/result" \
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

negative\_prompt

string

No

\-

The negative prompt for the generation.

images

array

Yes

\[\]

\-

A list of images to use as style references.

duration

integer

No

5

5, 10

The duration of the generated media in seconds.

aspect\_ratio

string

No

1:1

1:1, 16:9, 9:16

The aspect ratio of the generated media.

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

[Kwaivgi Kling V1.6 Multi I2V Pro](/docs/docs-api/kwaivgi/kwaivgi-kling-v1.6-multi-i2v-pro "Kwaivgi Kling V1.6 Multi I2V Pro")[Kwaivgi Kling V1.6 T2V Standard](/docs/docs-api/kwaivgi/kwaivgi-kling-v1.6-t2v-standard "Kwaivgi Kling V1.6 T2V Standard")