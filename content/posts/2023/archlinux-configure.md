---
title: Arch Linux 初步配置
description: 在 Arch Linux 系统上安装配置必备软件，如蓝牙、Yay、Zsh、输入法等。
date: 2023-06-24 09:31:15
updated: 2024-05-27 00:26:18
image: https://7.isyangs.cn/24/6664009851eb0-24.jpg
cover: https://7.isyangs.cn/24/6664009851eb0-24.jpg
banner: https://7.isyangs.cn/24/6664009851eb0-24.jpg
categories: [经验分享]
tags: [教程, archlinux, 系统]
---

## 如果你没有浏览器

这篇文章中有大量命令，如果你的 Arch Linux 没有浏览器，可以这样做：
- 启动 SSH 服务
  {% copy sudo systemctl start sshd prefix:$ %}
- 查看 IP 地址
  {% copy ip -br a prefix:$ %}
- 在其他有浏览器的设备上通过 SSH 连接到这台设备（复制后按 Ctrl-Shift-V 粘贴内容）
  {% copy ssh 用户名@IP地址 prefix:PS&nbsp;> %}

## 换源

Pacman（Arch Linux 的包管理器）会使用安装时的镜像源列表设置。

如果在安装时使用 ArchInstall 里的 Mirror 选项设置了源，建议使用 Reflector 来更新源。

- 安装
  {% copy sudo pacman -S reflector prefix:$ %}
- 使用 Reflector 更新源
  {% copy sudo reflector --verbose --country China --sort rate --save /etc/pacman.d/mirrorlist prefix:$ %}

## 字体

- 中文字体
  {% copy sudo pacman -S ttf-sarasa-gothic prefix:$ %}
- Nerd 字体 (zsh主题需要)
  {% copy sudo pacman -S ttf-nerd-fonts-symbols prefix:$ %}

## 设置时间策略

> Linux 一般认为主板时间是 UTC 时间，而 Windows 认为主板时间是当地时间。如果在双系统之间切换，则开机时时间会不正常，所以需要设置时间策略。

- 让 Linux 认为主板时间是当地时间，而不是 UTC
  {% copy sudo timedatectl set-local-rtc true prefix:$ %}

> 如果不想这样设置，还可以在 Windows 中添加注册表项，让 Windows 认为主板时间是 UTC。但是不要在两个系统中同时设置，否则矫枉过正会导致切换系统时产生反向时间差。
>
> {% copy reg add HKLM\SYSTEM\CurrentControlSet\Control\TimeZoneInformation /v RealTimeIsUniversal /t REG_DWORD /d 1 prefix:PS(管理员)> %}

## 显卡驱动

- 仅限主流 Nvidia 显卡
  {% copy sudo pacman -S nvidia prefix:$ %}

一般情况下不需要做出更多的配置，如果遇到问题，请参考 [ArchWiki - NVIDIA](https://wiki.archlinuxcn.org/wiki/NVIDIA) 和 [archlinux 简明指南 - 显卡驱动](https://arch.icekylin.online/guide/rookie/graphic-driver)（[镜像站](https://arch.cooo.site/guide/rookie/graphic-driver)）。另外，Nvidia 对于 Wayland 的兼容不佳，所以尽可能选择 X11 相关的桌面环境。

- 安装完显卡驱动后重启，检测 Nvidia 显卡驱动是否正常工作
  {% copy nvidia-smi prefix:$ %}
- 如果显示 `couldn't communicate with the NVIDIA driver` 提示，可能是显卡驱动没有安装成功
  - 可以先卸载 Nvidia 相关软件包
    {% copy sudo pacman -Rs nvidia nvidia-utils prefix:$ %}
  - 强制更新 Pacman 软件包列表
    {% copy sudo pacman -Syyuu prefix:$ %}
  - 重新安装 Nvidia 驱动
    {% copy sudo pacman -S nvidia prefix:$ %}
  - 重启

之后在桌面右键菜单第二项“配置显示设置…”，将显示器缩放调整为一个合适的倍数。

## Git

{% copy sudo pacman -S git prefix:$ %}

## Goproxy

可以使用 [七牛云GoProxy.cn](https://goproxy.cn/) [GoProxy.io](https://goproxy.io/zh/) 镜像加速。

- 编辑环境变量文件
  {% copy sudo vim /etc/environment prefix:$ %}
- 向环境变量中添加以下内容（按 `i` 键进入编辑模式，按 `Esc` 键退出编辑模式，输入 `:wq` 保存并退出）
  ```ini /etc/environment
  # GoProxy
  GO111MODULE=on
  GOPROXY=https://goproxy.cn
  ```

## Pacman/Yay 加速编译

- 查看 CPU 线程数
  {% copy cat /proc/cpuinfo | grep processor | wc -l prefix:$ %}
- 编辑 makepkg 配置文件
  {% copy sudo vim /etc/makepkg.conf prefix:$ %}
- 修改编译线程数：删除 `MAKEFLAGS=j[N]` 前面的注释标记，并将 `N` 替换为 CPU 线程数（输入 `/MAKE` 搜索）
  ```ini /etc/makepkg.conf
  MAKEFLAGS="-j8"
  ```

## 启用蓝牙

{% copy sudo systemctl enable --now bluetooth prefix:$ %}

## Yay

- 下载，需要先安装 Git。
  {% copy git clone http://aur.archlinux.org/yay.git && cd yay prefix:$ %}
- 编译安装，不行就多试几次或者换个网络。
  {% copy GOPROXY=http://goproxy.cn makepkg -si prefix:$ %}
- 安装后就能清除 Git 目录了。
  {% copy cd .. && rm -rf yay prefix:$ %}

## 浏览器

- Microsoft Edge
  {% copy yay -S microsoft-edge-dev-bin prefix:$ %}
- Google Chrome
  {% copy yay -S google-chrome prefix:$ %}

## VS Code

{% copy yay -S visual-studio-code-bin prefix:$ %}

## V2$(echo r)aya-

需要先安装浏览器，或者局域网下其他设备访问本设备的 2017 端口的 Web 控制台。

- 安装 V2$(echo r)aya-bin
  {% copy yay -S v2$(echo r)aya-bin prefix:$ %}
- 启动 V2$(echo r)aya 服务并设置开机启动
  {% copy sudo systemctl enable --now v2$(echo r)aya prefix:$ %}

## Zsh

大多数 Zsh 主题需要 Nerd 字体才能显示图标。

- 安装 Zsh 和常用插件
  {% copy sudo pacman -S zsh zsh-completions zsh-autosuggestions zsh-syntax-highlighting prefix:$ %}
- 安装 Powerlevel10k 主题
  {% copy yay -S zsh-theme-powerlevel10k-bin-git prefix:$ %}
- 设置本用户的默认 Shell 为 Zsh
  {% copy chsh -s /usr/bin/zsh prefix:$ %}
- 编辑 `~/.zshrc`
  {% copy vim ~/.zshrc prefix:$ %}
- 向配置文件中添加以下内容
  ```sh ~/.zshrc
  # Lines configured by zsh-newuser-install
  HISTFILE=~/.histfile
  HISTSIZE=1000
  SAVEHIST=1000
  bindkey -e
  # End of lines configured by zsh-newuser-install

  # The following lines were added by compinstall
  autoload -Uz compinit
  compinit
  # End of lines added by compinstall

  source /usr/share/zsh/plugins/zsh-autosuggestions/zsh-autosuggestions.zsh
  source /usr/share/zsh/plugins/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh
  source /usr/share/zsh-theme-powerlevel10k/powerlevel10k.zsh-theme

  bindkey '^[[H' beginning-of-line
  bindkey '^[[F' end-of-line
  bindkey "^[[1;5C" forward-word
  bindkey "^[[1;5D" backward-word
  bindkey '^H' backward-kill-word
  bindkey '^[[3~' delete-char

  zstyle ':completion:*' menu select

  alias ls='ls --color=auto'
  alias ll='ls -alFh --time-style=iso'
  alias ip='ip --color=auto'
  alias grep='grep --color=auto'
  ```

## 输入法

> 如果你使用 Wayland，操作可能不同，可以参照 [Fcitx5 - Arch Linux 中文维基](https://wiki.archlinuxcn.org/wiki/Fcitx5)。你也可以将`fcitx5-chinese-addons`替换为中州韵和 Rime。

- 安装 Fcitx5 和中文输入插件
  {% copy yay -S fcitx5-im fcitx5-chinese-addons prefix:$ %}
- 配置环境变量
  {% copy sudo vim /etc/environment prefix:$ %}
- 向环境变量添加以下内容
  ```ini /etc/environment
  # Fcitx5
  GTK_IM_MODULE=fcitx
  QT_IM_MODULE=fcitx
  XMODIFIERS=@im=fcitx
  SDL_IM_MODULE=fcitx
  INPUT_METHOD=fcitx
  GLFW_IM_MODULE=ibus
  ```

## 继续优化其他体验

可以参照 {% post_link 2023/archlinux-beautify %} 继续优化体验。

::LinkCard
---
icon: https://7.isyangs.cn/24/666400971559b-24.jpg
title: Arch Linux 易用性及美化
link: /2023/archlinux-beautify
---
::