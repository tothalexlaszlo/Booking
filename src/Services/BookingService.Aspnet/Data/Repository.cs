using BookingService.Aspnet.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace BookingService.Aspnet.Data;

/// <inheritdoc cref="IRepository{TEntity}"/>
internal class Repository<TEntity> : IRepository<TEntity> where TEntity : class
{
    internal readonly DbSet<TEntity> _dbSet;
    private readonly AppDbContext _context;

    public Repository(AppDbContext context)
    {
        ArgumentNullException.ThrowIfNull(context);
        _dbSet = context.Set<TEntity>();
        _context = context ?? throw new ArgumentNullException(nameof(context));
    }

    ///<inheritdoc/>
    public virtual void Add(TEntity entity) => _dbSet.Add(entity);

    ///<inheritdoc/>
    public virtual void AddRange(IEnumerable<TEntity> entities) => _dbSet.AddRange(entities);

    ///<inheritdoc/>
    public virtual void Delete(int id)
    {
        var entityToDelete = _dbSet.Find(id);
        if (entityToDelete is not null)
        {
            Delete(entityToDelete);
        }
    }

    ///<inheritdoc/>
    public virtual void Delete(TEntity entity) => _dbSet.Remove(entity);

    ///<inheritdoc/>
    public virtual void DeleteRange(IEnumerable<TEntity> entities) => _dbSet.RemoveRange(entities);

    ///<inheritdoc/>
    public virtual Task<List<TEntity>> FindAllByAsync(Expression<Func<TEntity, bool>> filter, Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>>? orderBy = null, string[]? includeProperties = null)
    {
        var queryable = _dbSet.AsQueryable().Where(filter);

        if (includeProperties is not null)
        {
            foreach (var includeProperty in includeProperties)
            {
                queryable = queryable.Include(includeProperty);
            }
        }

        return orderBy is null ? queryable.ToListAsync() : orderBy(queryable).ToListAsync();
    }

    ///<inheritdoc/>
    public virtual Task<TEntity?> FindByAsync(Expression<Func<TEntity, bool>> filter, string[]? includeProperties = null)
    {
        var queryable = _dbSet.AsQueryable().Where(filter);

        if (includeProperties is not null)
        {
            foreach (var includeProperty in includeProperties)
            {
                queryable = queryable.Include(includeProperty);
            }
        }

        return queryable.FirstOrDefaultAsync();
    }

    ///<inheritdoc/>
    public virtual ValueTask<TEntity?> FindByIdAsync(int id) => _dbSet.FindAsync(id);

    ///<inheritdoc/>
    public virtual Task<List<TEntity>> GetAllAsync() => _dbSet.ToListAsync();
    public void SaveChanges() => _context.SaveChanges();

    ///<inheritdoc/>
    public virtual void Update(TEntity entity) => _dbSet.Update(entity);

    ///<inheritdoc/>
    public virtual void UpdateRange(IEnumerable<TEntity> entities) => _dbSet.UpdateRange(entities);
}