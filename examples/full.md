Hello everybody! I'm happy to announce that *–at the day of writing this post–* [GitterCLI](http://npmjs.com/gitter-cli) is on version `v0.6.0` containing more and better features.

> GitterCLI is a extremely simple [Gitter](http://gitter.im) client for your terminal.

GitterCLI it's a terminal application based on [Blessed](#TODO).

### Commands & Behaviours

```
➜  ~  gitter-cli

  Usage: gitter-cli [options] [command]


  Commands:

    join|j [name]        Join a room with the specified name.
    authorize|set-auth   Set the access-key token for client authentication.
    whoami|me            Display your user information based on the existing token.

  Options:

    -h, --help       output usage information
    -V, --version    output the version number
    --token [token]  Set the access-key token for client authentication. This won't be persisted.

```
*Display of gitter-cli help dialog.*

### Authorization

![gitter-cli-authorization](/content/images/2015/05/Screen-Shot-2015-05-17-at-10-05-13-PM.png)

It uses your personal Gitter token to authenticate you. The only way this will happen is if you provide it with the `set-auth` command. Like: `gitter-cli set-auth <<Your personal token>>`.

After that, the program will save the token in a `secrets.json` file that lives on the application core module. You can modify it any time you'd like, directly modifying the file or calling the `set-auth` command again.

I'm planning to use the OS X Keychain (if it's available) on future versions.

### Room join

![gitter-cli-join-room](/content/images/2015/05/51cdb1ca-fcd1-11e4-8aa6-d7100f234ee3.png)

When joining a room, the application will display a loading screen while release the connection with Gitter.

If it's successful, it will instantiate Blessed to display **basically* to big widgets: The ==message input== (which is a `Blessed.Textarea`) and the ==chat history== (or board, which is a custom widget that inherits from `Blessed.Box`).

If it's not, it will display a ==message== (simple `Blessed.Message`) to let the user know the error and it will close the process after three seconds.

### Chat History

Previously, I used `Blessed.List` for the chat history but the lag was too intense. So I decide to create a custom widget, the reason of that is to have children as a list of messages which are also custom widgets that knows how to display their format correctly and delete all the lists interactivity methods that were unnecessary for our case.

Using `marked`, `wordwrap` and `html-to-text` it allows me to display rich information on the message lists without any trouble, also **we can see emojis there 🎉**.

![gitter-cli-with-emojis](/content/images/2015/05/1b72a55e-fcd1-11e4-8b24-9227798c2a62.png)
