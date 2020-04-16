module.exports.ash = (fn) => (...args) => {
  const ret = fn(...args)
  const next = args[args.length-1]
  return Promise.resolve(ret).catch(next)
}
