# /docs/docs-comfyui

来源: https://wavespeed.ai/docs/docs-comfyui

Using in ComfyUI

# ComfyUI Integration

Integrate WaveSpeedAI’s high-performance image and video generation services directly into ComfyUI with our custom nodes.

## Key Features[](#key-features)

*   Seamless API access within ComfyUI
*   Multiple nodes for diverse AI tasks
*   LoRA support for style customization

## Quick Setup[](#quick-setup)

1.  Get your API key from [WaveSpeedAI](https://wavespeed.ai)
2.  Install ComfyUI-WaveSpeedAI-API custom node:
    
    ```
    cd ComfyUI/custom_nodes
    git clone https://github.com/WaveSpeedAI/wavespeed-comfyui.git
    cd wavespeed-comfyui
    pip install -r requirements.txt
    ```
    
3.  Set your API key:
    *   In the Client node, or
    *   In `config.ini` (rename `config.ini.tmp` to `config.ini` and add your key)

For detailed node information and advanced usage, refer to our [GitHub repository](https://github.com/WaveSpeedAI/wavespeed-comfyui.git).

Unlock the full potential of WaveSpeedAI in your ComfyUI projects!

[Quick Start](/docs/docs-quick-start "Quick Start")[Using in N8N](/docs/docs-n8n "Using in N8N")