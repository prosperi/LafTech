class ApiController < ApplicationController
  def visualization_1
    hash = { a: true, b: false, c: nil }
    json_response([[1,2,3,4], [1,2], hash])
  end

  def visualization_2
    hash = { a: true, b: false, c: nil }
    json_response([[1,2,3,4], [1,2], hash])
  end

  def visualization_3
    hash = { a: true, b: false, c: nil }
    json_response([[1,2,3,4], [1,2], hash])
  end
end
