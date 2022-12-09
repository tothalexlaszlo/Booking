using System.Linq.Expressions;

namespace BookingService.Aspnet.Interfaces;

/// <summary>
/// Generic repository.
/// </summary>
/// <typeparam name="TEntity">Entity.</typeparam>
interface IRepository<TEntity> where TEntity : class
{
    void SaveChanges();
    void Add(TEntity entity);
    void AddRange(IEnumerable<TEntity> entities);
    void Delete(int id);
    void Delete(TEntity entity);
    void DeleteRange(IEnumerable<TEntity> entities);

    /// <summary>
    /// Find all the specific entities.
    /// </summary>
    /// <param name="filter">Filter condition. Eg.: <c>partner => partner.Name == "HUN"</c></param>
    /// <param name="orderBy">Lamba expression. Eg: <c>q => q.OrderBy(s => s.Name)</c></param>
    /// <param name="includeProperties">Lif of navigation properties.</param>
    /// <remarks>
    /// Multiple active operations on the same context instance are not supported.
    /// Use <c>await</c> to ensure that any asynchronous operations have completed before calling another method on this context.
    /// </remarks>
    /// <returns>A task that represents the asynchronous operation. The task result contains a List of <typeparamref name="TEntity"/>.</returns>
    Task<List<TEntity>> FindAllByAsync(Expression<Func<TEntity, bool>> filter, Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>>? orderBy = null, string[]? includeProperties = null);

    /// <summary>
    /// Find a specific entity.
    /// </summary>
    /// <param name="filter">Filter condition. Eg.: <c>partner => partner.Name == "HUN"</c></param>
    /// <param name="includeProperties">Lif of navigation properties.</param>
    /// <remarks>
    /// Multiple active operations on the same context instance are not supported.
    /// Use <c>await</c> to ensure that any asynchronous operations have completed before calling another method on this context.
    /// </remarks>
    /// <returns>A task that represents the asynchronous operation. The task result contains a <typeparamref name="TEntity"/>.</returns>
    Task<TEntity?> FindByAsync(Expression<Func<TEntity, bool>> filter, string[]? includeProperties = null);
    ValueTask<TEntity?> FindByIdAsync(int id);

    /// <summary>
    /// Get all the entitis.
    /// </summary>
    /// <remarks>
    /// Multiple active operations on the same context instance are not supported.
    /// Use <c>await</c> to ensure that any asynchronous operations have completed before calling another method on this context.
    /// </remarks>
    /// <returns>A task that represents the asynchronous operation. The task result contains a <c>System.Collections.Generic.List</c>.</returns>
    Task<List<TEntity>> GetAllAsync();
    void Update(TEntity entity);
    void UpdateRange(IEnumerable<TEntity> entities);
}