namespace ProfileService.Aspnet.Models;

internal sealed class RegistrationResult
{
    public UserCreationState UserCreationState { get; set; }

    public List<string> Errors = new List<string>();

    public RegistrationResult(UserCreationState userCreationState = UserCreationState.Success)
        => UserCreationState = userCreationState;
}
