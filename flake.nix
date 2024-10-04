{
  description = "Nix flake";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs?ref=nixos-unstable";
  };

  outputs = { self, nixpkgs }: 
  let
    supportedSystems = [ "x86_64-linux" "aarch64-linux" ];

    forAllSystems = nixpkgs.lib.genAttrs supportedSystems;

    nixpkgsFor = forAllSystems (system: import nixpkgs { inherit system; });
  in {
    devShells = forAllSystems (system:
      let
        pkgs = nixpkgsFor.${system}; # Interpolation được sửa
      in {
        default = pkgs.mkShell {
          nativeBuildInputs = [
            # Development tools
            pkgs.dbeaver-bin
            pkgs.nodejs
            pkgs.go

            # Language servers
            pkgs.gopls
            pkgs.nixd

            # Other tools
            pkgs.scc
          ];
        };
      });
  };
}
