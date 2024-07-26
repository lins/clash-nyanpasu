import consola from "consola";
import { SupportedArch } from "../types/index";
import { applyProxy, octokit } from "./octokit";

export type ArchMapping = { [key in SupportedArch]: string };

// resolvers block
export type LatestVersionResolver = Promise<{
  name: string;
  version: string;
  archMapping: ArchMapping;
}>;

export const resolveMihomo = async (): LatestVersionResolver => {
  const latestRelease = await octokit.rest.repos.getLatestRelease(
    applyProxy({
      owner: "MetaCubeX",
      repo: "mihomo",
    }),
  );

  consola.debug(`mihomo latest release: ${latestRelease.data.tag_name}`);

  const archMapping: ArchMapping = {
    // [SupportedArch.WindowsX86]: "mihomo-windows-386-{}.zip",
    [SupportedArch.WindowsX86_64]: "mihomo-windows-amd64-compatible-{}.zip",
    // [SupportedArch.WindowsAarch64]: "mihomo-windows-arm64-{}.zip",
    [SupportedArch.LinuxAarch64]: "mihomo-linux-arm64-{}.gz",
    [SupportedArch.LinuxAmd64]: "mihomo-linux-amd64-compatible-{}.gz",
    [SupportedArch.DarwinArm64]: "mihomo-darwin-arm64-{}.gz",
    [SupportedArch.DarwinX64]: "mihomo-darwin-amd64-compatible-{}.gz",
  } satisfies ArchMapping;

  return {
    name: "mihomo",
    version: latestRelease.data.tag_name,
    archMapping,
  };
};

export const resolveMihomoAlpha = async (): LatestVersionResolver => {
  const resp = await fetch(
    "https://github.com/MetaCubeX/mihomo/releases/download/Prerelease-Alpha/version.txt",
  );

  const alphaReleaseHash = (await resp.text()).trim();

  consola.debug(`mihomo alpha release: ${alphaReleaseHash}`);

  const archMapping: ArchMapping = {
    // [SupportedArch.WindowsX86]: "mihomo-windows-386-{}.zip",
    [SupportedArch.WindowsX86_64]: "mihomo-windows-amd64-compatible-{}.zip",
    // [SupportedArch.WindowsAarch64]: "mihomo-windows-arm64-{}.zip",
    [SupportedArch.LinuxAarch64]: "mihomo-linux-arm64-{}.gz",
    [SupportedArch.LinuxAmd64]: "mihomo-linux-amd64-compatible-{}.gz",
    [SupportedArch.DarwinArm64]: "mihomo-darwin-arm64-{}.gz",
    [SupportedArch.DarwinX64]: "mihomo-darwin-amd64-compatible-{}.gz",
  } satisfies ArchMapping;

  return {
    name: "mihomo_alpha",
    version: alphaReleaseHash,
    archMapping,
  };
};

export const resolveClashRs = async (): LatestVersionResolver => {
  const latestRelease = await octokit.rest.repos.getLatestRelease(
    applyProxy({
      owner: "Watfaq",
      repo: "clash-rs",
    }),
  );

  consola.debug(`clash-rs latest release: ${latestRelease.data.tag_name}`);

  const archMapping: ArchMapping = {
    // [SupportedArch.WindowsX86]: "mihomo-windows-386-alpha-{}.zip",
    [SupportedArch.WindowsX86_64]: "clash-x86_64-pc-windows-msvc.exe",
    // [SupportedArch.WindowsAarch64]: "mihomo-windows-arm64-alpha-{}.zip",
    [SupportedArch.LinuxAarch64]: "clash-aarch64-unknown-linux-gnu-static-crt",
    [SupportedArch.LinuxAmd64]: "clash-x86_64-unknown-linux-gnu-static-crt",
    [SupportedArch.DarwinArm64]: "clash-aarch64-apple-darwin",
    [SupportedArch.DarwinX64]: "clash-x86_64-apple-darwin",
  } satisfies ArchMapping;

  return {
    name: "clash_rs",
    version: latestRelease.data.tag_name,
    archMapping,
  };
};

export const resolveClashPremium = async (): LatestVersionResolver => {
  const latestRelease = await octokit.rest.repos.getLatestRelease(
    applyProxy({
      owner: "zhongfly",
      repo: "Clash-premium-backup",
    }),
  );

  consola.debug(`clash-premium latest release: ${latestRelease.data.tag_name}`);

  const archMapping: ArchMapping = {
    // [SupportedArch.WindowsX86]: "clash-windows-386-n{}.zip",
    [SupportedArch.WindowsX86_64]: "clash-windows-amd64-n{}.zip",
    // [SupportedArch.WindowsAarch64]: "clash-windows-arm64-n{}.zip",
    [SupportedArch.LinuxAarch64]: "clash-linux-arm64-n{}.gz",
    [SupportedArch.LinuxAmd64]: "clash-linux-amd64-n{}.gz",
    [SupportedArch.DarwinArm64]: "clash-darwin-arm64-n{}.gz",
    [SupportedArch.DarwinX64]: "clash-darwin-amd64-n{}.gz",
  } satisfies ArchMapping;

  return {
    name: "clash_premium",
    version: latestRelease.data.tag_name,
    archMapping,
  };
};
