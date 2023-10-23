#  git无法识别文件名字大写的改变

首先，Windows 下 git 默认配置是对文件/文件夹名称的大小写不敏感：

```bash
git config --get core.ignorecase

# true
```

这就导致了一些时候的难以预料问题的产生，针对这个配置，先引用一下官方帮助文档的原话：

> The default is `false`, except `git-clone` or `git-init` will probe and set core.ignoreCase `true` if appropriate when the repository is created.

即 git 默认对大小写敏感，但是会在仓库克隆或初始化时，根据当前系统来设置是否忽略大小写，比如 Windows 下会设置为 `true`，即不敏感，而 Linux 中不会忽略；

对于这种情况 git 提供了一种规范的做法，使用 `git mv` 命令：

```bash
git mv test.txt TEST.txt
```

以此来实现对文件的重命名，同时 git 也会将其识别为 `Rename` 的变更类型，然后正常提交推送就能同步到远程仓库了；如果是重命名文件夹，由于 Windows 下对文件夹的大小写也不敏感（-_-），所以直接使用上面的方法会失败：

```bash
git mv test-dir TEST-DIR
```

这里就只有迂回一下，先把文件夹命名成其他名称，然后再命名为大写就行了：

```bash
git mv test-dir tmp
git mv tmp TEST-DIR
```

##  修改配置

可以选择直接修改 git 配置为不忽略大小写：

```bash
git config core.ignorecase false
```

然后直接在资源管理器或编辑器中修改文件名大小写，git 就会识别到了，而且是被识别为 `untracked` 类型的变更，这依然是 Windows 下对文件名大小写不敏感导致的（=_=），如果直接推送到远程的话，那么远程仓库就会同时存在大小写**两个版本**的文件（github/gitlab 服务器通常都是 Linux 系统），为后期维护添加隐患，本地在分支间切换时也可能出现以下报错：

```bash
error: The following untracked working tree files would be overwritten by checkout:
        test.txt
Please move or remove them before you switch branches.
Aborting
```

这种情况下依然需要使用一些迂回的办法，就是先把要重命名的文件改成其他临时名称，提交一次（`git commit`），然后再把临时名称改成想要的名称，再提交一次，最后推送到远程，这样本地和远程都只保留下一个文件了；

```bash
# rename test.txt --> tmp
git add .
git commit -m "..."

# rename tmp --> TEST.TXT
git add .
git commit -m "..."

git push
```