#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src
COPY ["src/Services/ProfileService.Aspnet/ProfileService.Aspnet.csproj", "src/Services/ProfileService.Aspnet/"]
RUN dotnet restore "src/Services/ProfileService.Aspnet/ProfileService.Aspnet.csproj"
COPY . .
WORKDIR "/src/src/Services/ProfileService.Aspnet"
RUN dotnet build "ProfileService.Aspnet.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "ProfileService.Aspnet.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "ProfileService.Aspnet.dll"]