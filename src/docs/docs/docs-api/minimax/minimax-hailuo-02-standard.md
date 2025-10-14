# /docs/docs-api/minimax/minimax-hailuo-02-standard

来源: https://wavespeed.ai/docs/docs-api/minimax/minimax-hailuo-02-standard

[WaveSpeedAI API](/docs/docs-api/webhooks "WaveSpeedAI API")[Minimax](/docs/docs-api/minimax/minimax-hailuo-02-fast "Minimax")Minimax Hailuo 02 Standard

# Minimax Hailuo 02 Standard

Minimax Hailuo 02 Standard

## Playground[](#playground)

[Try it on WavespeedAI!](https://wavespeed.ai/models/minimax/hailuo-02/standard)

Hailuo 02 is a new AI video generation model, from Hailuo AI, created on MiniMax’s evolving framework. It has been fine-tuned to deliver ultra-clear 768P resolution and unprecedented responsiveness while even handling, the craziest of physics driven scenes.

## Features[](#features)

# What Makes Hailuo 02 Outperform Other AI Video Generation Models?

## 1080P Native Output[](#1080p-native-output)

Nobody wants blurry footage. Hailuo 02 gives you the full HD 768P video straight from the model, not upscaled afterwards. This is a huge leap from the previously limited 720P. Your video will look sharp even on those big screens. Ads, explainers, shorts—it all matters if it looks clear. And Hailuo 02 can deliver that clarity with just a few clicks.

## Multiple Duration Options[](#multiple-duration-options)

Flexibility means a lot with AI video generation, and Hailuo 02 offers clip format in both 6-second and 10-second formats. Creators can mix and match formats seamlessly, and the length of content becomes more controllable without impacting quality. It’s a small detail but has a big impact on workflow. There’s no need to re-render full scenes when mocking up combinations—just generate and combine.

## Enhanced Motion & Physical Effects[](#enhanced-motion--physical-effects)

This model doesn’t merely understand movement—it completely owns it. Hailuo 02 is equipped with state-of-the-art motion rendering, allowing it to capture dynamic scenes and physical interactions more smoothly than most competitors. It adapts easily to prompts involving complex physics, such as flying debris, bouncing objects, or camera shakes. The result: videos that feel organic and cinematic.

## Better Scene Transitions[](#better-scene-transitions)

Image-to-video models can sometimes produce awkward cuts or uneven frame stitching, but Hailuo 02 really smooths things out. Transitions between frames resemble real-world camera work more than simple machine stitching. The end result is closer to a movie trailer than a slideshow, especially for creators transforming still images into dynamic sequences.

## Real-World Reliability[](#real-world-reliability)

Hailuo 02 doesn’t just show strong benchmark performance—it delivers in real creative use cases. Users have reported consistent output when repeating the same prompts. This excellent consistency and low randomness is a major benefit for professionals who value repeatability, especially in team environments with high standards.

## Lower Cost[](#lower-cost)

AI tools tend to be powerful but pricey—Hailuo 02 is both powerful and affordable. Compared to premium tools like Veo 3 or closed systems like Sora, it offers incredible value. Designed for creators and startups, not just enterprises, it’s a great entry point for building professional-quality video content on a budget.

* * *

## What Users Are Saying About Hailuo 02[](#what-users-are-saying-about-hailuo-02)

> “The physics are insane. I have to say that not every video came out perfect on the first try, but I still got great results really easily. The way cats jump is just… perfect.”

> “Truly impressed by how well it follows prompts. Even when I pushed the boundaries of imagination, it executed beautifully. Less distortion, stunning fast motion. Welcome back, king!”

> “After many long waits, the return of Hailuo AI is here. With their latest model, 02. It packs a punch, with 1080p visuals, physics, prompt adherence strength, and cinematic capabilities. I present to you a compilation of my tests so far.”

> “With up to 1080p output and 10-second clips, this new model delivers accurate prompt adherence, dynamic motion, and some of the best physics understanding we’ve seen yet. It feels like a serious leap forward!”

* * *

## Use Cases of Hailuo 02[](#use-cases-of-hailuo-02)

*   **Short-form social content**  
    Ideal for TikTok, Instagram Reels, or YouTube Shorts. Hailuo 02 provides cinematic visuals in just seconds.
    
*   **Ad and product videos**  
    Create high-resolution, motion-rich videos that make products stand out—no full production team required.
    
*   **Game and film prototyping**  
    Rapidly visualize characters, scenes, and trailers before full-scale production.
    
*   **Educational and training videos**  
    Turn complex concepts into visually engaging animated sequences—perfect for teachers, course creators, and businesses.
    
*   **AI-enhanced storytelling**  
    Animate still images into cinematic micro-scenes without any animation skills.
    
*   **Presentation and pitch support**  
    Make your idea or product pitch unforgettable with custom AI-generated video sequences.
    

* * *

## Tips for Using Hailuo 02[](#tips-for-using-hailuo-02)

*   **Use cinematic prompts**  
    Think like a director—describe angles, lighting, and scene dynamics to enhance visual richness.
    
*   **Use motion-rich language**  
    Incorporate action verbs like “zoom in,” “pan left,” or “fly over” to drive dynamic camera effects.
    
*   **Guide your video with a first frame**  
    Uploading a still image helps the model lock in composition, structure, and mood.
    
*   **Start small, go big later**  
    Begin with 6-second clips to test ideas, then extend or merge for longer sequences.
    
*   **Preview, tweak, repeat**  
    Don’t aim for perfection right away. Iterate quickly and refine results through multiple generations.
    

* * *

## FAQs[](#faqs)

**Q1: Does Hailuo 02 support audio generation?**  
No—for now, it focuses purely on visuals. You can manually pair it with music, voiceovers, or sound effects for full creative control.

**Q2: Can I use it for commercial projects?**  
Absolutely. Just ensure you review the licensing terms and platform policies if you intend to monetize your output.

**Q3: How long does video generation take?**  
Typically, it takes 30 to 90 seconds for a 6-second or 10-second clip, depending on prompt complexity.

**Q4: Is there a mobile version?**  
While there’s no dedicated app, most platforms supporting Hailuo 02 run smoothly on mobile browsers.

## Authentication[](#authentication)

For authentication details, please refer to the [Authentication Guide](/docs/docs-authentication).

## API Endpoints[](#api-endpoints)

### Submit Task & Query Result[](#submit-task--query-result)

cURLPythonJavaScript

```bash

# Submit the task
curl --location --request POST "https://api.wavespeed.ai/api/v3/minimax/hailuo-02/standard" \
--header "Content-Type: application/json" \
--header "Authorization: Bearer ${WAVESPEED_API_KEY}" \
--data-raw '{
    "duration": 6,
    "enable_prompt_expansion": false
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

The model generates video with the picture passed in as the first frame.Base64 encoded strings in data:image/jpeg; base64,{data} format for incoming images, or URLs accessible via the public network. The uploaded image needs to meet the following conditions: Format is JPG/JPEG/PNG; The aspect ratio is greater than 2:5 and less than 5:2; Short side pixels greater than 300px; The image file size cannot exceed 20MB.

end\_image

string

No

\-

\-

The model generates video with the picture passed in as the last frame.Base64 encoded strings in data:image/jpeg; base64,{data} format for incoming images, or URLs accessible via the public network. The uploaded image needs to meet the following conditions: Format is JPG/JPEG/PNG; The aspect ratio is greater than 2:5 and less than 5:2; Short side pixels greater than 300px; The image file size cannot exceed 20MB.

duration

integer

No

6

6, 10

The duration of the generated media in seconds.

enable\_prompt\_expansion

boolean

No

false

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

[Minimax Hailuo 02 Pro](/docs/docs-api/minimax/minimax-hailuo-02-pro "Minimax Hailuo 02 Pro")[Minimax Hailuo 02 T2V Pro](/docs/docs-api/minimax/minimax-hailuo-02-t2v-pro "Minimax Hailuo 02 T2V Pro")