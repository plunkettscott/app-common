# Contribute to the App Common Libraries

First off, thank you for considering contributing to Response. It's people like you that make the Lavra community great to be a part of. If at any point you have questions about the contributing process, please refer back to this guide and [join our Discord](https://discord.gg/ZRxCAv7) so that we can answer any further questions.

Following these guidelines helps to communicate that you respect the time of the developers managing and developing this open source project. In return, they should reciprocate that respect in addressing your issue, assessing changes, and helping you finalize your pull requests.

## Bug Reporting

If you think you have found a bug in Response, first make sure that you are testing the latest version of Response - we might have already fixed the bug in a later version. If not, search our [Issues](https://github.com/responseams/app-common/issues) on Github in case a similar issue has already been opened or is already being fixed.

It is very helpful if you can prepare a step-by-step reproduction of the bug. In other words, provide a small test case that we can use to confirm the bug. This will allow us to locate the source of the bug and provide a solution much quicker. When creating issues, it is helpful to provide as much information as you can, especially if the bug is not simple to reproduce.

Just remember, the easier it is for us to recreate your problem, the faster it is likely to be fixed.

## Feature Requests

If you would like to see a new feature that does not exist in Response currently, you are probably not alone. It's highly likely that others would like the same or similar feature. Please search the [Issues](https://github.com/responseams/app-common/issues) list first, and if the feature has not been requested before, you may create a Feature Request. Please describe your feature in detail, including what you would like see, why you need it, and how it should work.

Not every feature can or will be implemented, however, if we are able to implement a feature and the feature does not go against the project goals, we'll be happy to implement it for you, or help someone from the community implement it.

# Contributing Code and Documentation Changes

If you have a bug you want to fix or a new feature you would like to contribute to Response, please find or open an issue about it first. We use issues to discuss the proposed solutions as well as provide assistance to contributors to allow them to get their contribution merged.

We enjoy working with contributors to get their code accepted. There are many approaches to fixing problems and implementing features and it is imperative that we find the best approach before writing too much code. If you are looking to contribute a refactor, please ensure all test cases pass and that any additional tests required are added.

The process for contributing to any of the [Response AMS repositories](https://github.com/responseams) is similar. You can find the details for these libraries below.

## Fork and Clone this Repository

You will need to fork the repository and clone it to your local machine to begin making any changes. [See Github's help page for assistance with this.](https://help.github.com/articles/fork-a-repo)

## Setup Local Environment

To begin, please follow these steps to setup the environment for contributing.

1. Install [Yarn](https://yarnpkg.com/) using your preferred method.

2. Run `yarn install` in the root of this cloned repository to install all of the dependencies for this repository.

3. Run `yarn bootstrap` to install all package dependencies and link local dependencies to each other.

4. Code!

## Don't Forget Tests

We aim for 100% test coverage. If you provide modifications, please ensure you provide tests that test your code changes and any potential sideeffects of the change. If your codebase does not include a test, it will not be merged or released until tests are included and the full test suite passes.
